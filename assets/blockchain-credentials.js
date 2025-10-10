/**
 * Blockchain-Verified Credential Fortress
 * Ethereum DID system for tamper-proof credential verification
 * Uses Web3.js and IPFS for decentralized identity management
 */

class BlockchainCredentialVault {
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.userAccount = null;
    this.isInitialized = false;
    this.ipfsGateway = 'https://ipfs.io/ipfs/';
    
    // Contract ABI for Civora Credential Vault (simplified)
    this.contractABI = [
      {
        "inputs": [{"name": "_credentialHash", "type": "string"}, {"name": "_metadata", "type": "string"}],
        "name": "storeCredential",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function"
      },
      {
        "inputs": [{"name": "_tokenId", "type": "uint256"}],
        "name": "getCredential",
        "outputs": [{"name": "", "type": "string"}, {"name": "", "type": "string"}, {"name": "", "type": "uint256"}],
        "type": "function"
      },
      {
        "inputs": [{"name": "_credentialHash", "type": "string"}],
        "name": "verifyCredential",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
      }
    ];
    
    // Simulated contract address (would be actual deployed contract)
    this.contractAddress = '0x742d35Cc6634C0532925a3b8D435b2C4e64a5A70';
    
    // Credential types
    this.credentialTypes = {
      TRANSCRIPT: 'academic_transcript',
      DIPLOMA: 'diploma_certificate',
      LANGUAGE_CERT: 'language_certificate',
      WORK_EXPERIENCE: 'work_experience',
      RECOMMENDATION: 'recommendation_letter',
      PORTFOLIO: 'portfolio_project',
      IDENTITY: 'identity_document'
    };
    
    // Verification levels
    this.verificationLevels = {
      SELF_ATTESTED: 0,
      INSTITUTION_VERIFIED: 1,
      THIRD_PARTY_AUDITED: 2,
      EMBASSY_ENDORSED: 3
    };
  }

  async init() {
    try {
      // Initialize Web3 connection
      if (typeof window !== 'undefined' && window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        console.log('🔗 Web3 initialized with user wallet');
      } else {
        // Fallback to public provider for read-only operations
        this.web3 = new Web3('https://mainnet.infura.io/v3/demo-key');
        console.log('🔗 Web3 initialized with public provider (read-only)');
      }
      
      // Initialize contract interface (simulation)
      this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
      
      this.isInitialized = true;
      console.log('🛡️ Blockchain Credential Vault initialized');
      
      return this;
    } catch (error) {
      console.error('Failed to initialize blockchain credentials:', error);
      return null;
    }
  }

  async connectWallet() {
    if (!window.ethereum) {
      throw new Error('MetaMask or compatible wallet not found');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      this.userAccount = accounts[0];
      console.log('👛 Wallet connected:', this.userAccount);
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        this.userAccount = accounts[0] || null;
        this.onAccountChanged(accounts);
      });
      
      return this.userAccount;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  onAccountChanged(accounts) {
    if (accounts.length === 0) {
      console.log('👛 Wallet disconnected');
      this.userAccount = null;
    } else {
      console.log('👛 Account changed to:', accounts[0]);
      this.userAccount = accounts[0];
    }
    
    // Trigger account change event
    window.dispatchEvent(new CustomEvent('walletAccountChanged', {
      detail: { account: this.userAccount }
    }));
  }

  // Generate DID (Decentralized Identifier)
  generateDID(userAddress) {
    return `did:ethr:${userAddress}`;
  }

  // Create credential hash using SHA-256
  async createCredentialHash(credentialData) {
    const dataString = JSON.stringify(credentialData);
    const encoder = new TextEncoder();
    const data = encoder.encode(dataString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Store credential on blockchain (simulated)
  async storeCredential(credentialData, verificationLevel = this.verificationLevels.SELF_ATTESTED) {
    if (!this.userAccount) {
      throw new Error('Wallet not connected');
    }

    try {
      // Create credential hash
      const credentialHash = await this.createCredentialHash(credentialData);
      
      // Create metadata
      const metadata = {
        type: credentialData.type,
        issuer: credentialData.issuer || 'self',
        timestamp: Date.now(),
        verificationLevel: verificationLevel,
        did: this.generateDID(this.userAccount)
      };
      
      // Simulate blockchain transaction (in real implementation, this would be actual transaction)
      const txResult = await this.simulateBlockchainTransaction('storeCredential', [
        credentialHash,
        JSON.stringify(metadata)
      ]);
      
      // Store in local cache
      this.cacheCredential(credentialHash, credentialData, metadata);
      
      console.log('🔒 Credential stored on blockchain:', txResult);
      return {
        tokenId: txResult.tokenId,
        credentialHash: credentialHash,
        transactionHash: txResult.txHash,
        metadata: metadata
      };
      
    } catch (error) {
      console.error('Failed to store credential:', error);
      throw error;
    }
  }

  // Verify credential authenticity
  async verifyCredential(credentialHash) {
    try {
      // Simulate blockchain verification
      const verificationResult = await this.simulateBlockchainQuery('verifyCredential', [credentialHash]);
      
      if (verificationResult.exists) {
        const credentialData = await this.getCredentialFromCache(credentialHash);
        
        return {
          isValid: true,
          credentialHash: credentialHash,
          metadata: verificationResult.metadata,
          verificationLevel: verificationResult.verificationLevel,
          timestamp: verificationResult.timestamp,
          credentialData: credentialData
        };
      } else {
        return {
          isValid: false,
          error: 'Credential not found on blockchain'
        };
      }
    } catch (error) {
      console.error('Failed to verify credential:', error);
      return {
        isValid: false,
        error: error.message
      };
    }
  }

  // Generate verifiable credential NFT
  async mintCredentialNFT(credentialData, recipientAddress) {
    if (!this.userAccount) {
      throw new Error('Wallet not connected');
    }

    try {
      const credentialHash = await this.createCredentialHash(credentialData);
      
      // Create NFT metadata following ERC-721 standard
      const nftMetadata = {
        name: `Civora Credential - ${credentialData.type}`,
        description: `Verified educational credential issued through Civora's blockchain system`,
        image: await this.generateCredentialBadge(credentialData),
        attributes: [
          { trait_type: 'Credential Type', value: credentialData.type },
          { trait_type: 'Issuer', value: credentialData.issuer },
          { trait_type: 'Issue Date', value: new Date(credentialData.issueDate).toISOString() },
          { trait_type: 'Verification Level', value: this.getVerificationLevelName(credentialData.verificationLevel) },
          { trait_type: 'Student Name', value: credentialData.studentName }
        ],
        external_url: `https://civora.me/verify/${credentialHash}`,
        credential_hash: credentialHash
      };
      
      // Upload metadata to IPFS (simulated)
      const ipfsHash = await this.uploadToIPFS(nftMetadata);
      
      // Mint NFT (simulated)
      const mintResult = await this.simulateNFTMinting(recipientAddress, ipfsHash, credentialHash);
      
      console.log('🎨 Credential NFT minted:', mintResult);
      return {
        tokenId: mintResult.tokenId,
        tokenURI: `${this.ipfsGateway}${ipfsHash}`,
        credentialHash: credentialHash,
        transactionHash: mintResult.txHash
      };
      
    } catch (error) {
      console.error('Failed to mint credential NFT:', error);
      throw error;
    }
  }

  // Generate visual credential badge
  async generateCredentialBadge(credentialData) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 300);
    gradient.addColorStop(0, '#0b5fff');
    gradient.addColorStop(1, '#8B5CF6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 300);
    
    // Civora logo area (simulated)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(20, 20, 60, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter';
    ctx.fillText('CIVORA', 30, 45);
    
    // Credential type
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(credentialData.type.toUpperCase(), 200, 100);
    
    // Student name
    ctx.font = '18px Inter';
    ctx.fillText(credentialData.studentName || 'Student Name', 200, 140);
    
    // Institution
    ctx.font = '14px Inter';
    ctx.fillText(credentialData.issuer || 'Institution', 200, 170);
    
    // Verification badge
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(350, 50, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('✓', 350, 55);
    
    // Blockchain hash (truncated)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    const shortHash = (await this.createCredentialHash(credentialData)).substring(0, 16) + '...';
    ctx.fillText(`Hash: ${shortHash}`, 200, 250);
    
    // Issue date
    ctx.fillText(`Issued: ${new Date().toISOString().split('T')[0]}`, 200, 270);
    
    return canvas.toDataURL('image/png');
  }

  // Embassy smart contract integration (simulated)
  async submitToEmbassyVerification(credentialHash, embassyCode) {
    try {
      console.log(`🏛️ Submitting credential ${credentialHash} to embassy ${embassyCode} for verification`);
      
      // Simulate embassy verification process
      const verificationRequest = {
        credentialHash: credentialHash,
        embassyCode: embassyCode,
        timestamp: Date.now(),
        status: 'pending',
        estimatedProcessingTime: '5-10 business days'
      };
      
      // Store verification request
      const requests = JSON.parse(localStorage.getItem('embassyVerificationRequests') || '[]');
      requests.push(verificationRequest);
      localStorage.setItem('embassyVerificationRequests', JSON.stringify(requests));
      
      // Simulate processing (in real implementation, this would trigger embassy API)
      setTimeout(() => {
        this.simulateEmbassyResponse(credentialHash, embassyCode);
      }, 5000); // 5 seconds for demo
      
      return verificationRequest;
    } catch (error) {
      console.error('Failed to submit to embassy verification:', error);
      throw error;
    }
  }

  async simulateEmbassyResponse(credentialHash, embassyCode) {
    // Simulate embassy verification response
    const response = {
      credentialHash: credentialHash,
      embassyCode: embassyCode,
      verified: Math.random() > 0.2, // 80% success rate for demo
      timestamp: Date.now(),
      verificationId: `EMB-${embassyCode}-${Date.now()}`,
      notes: 'Credential verified by embassy officials'
    };
    
    // Store response
    const responses = JSON.parse(localStorage.getItem('embassyVerificationResponses') || '[]');
    responses.push(response);
    localStorage.setItem('embassyVerificationResponses', JSON.stringify(responses));
    
    // Trigger event for UI updates
    window.dispatchEvent(new CustomEvent('embassyVerificationComplete', {
      detail: response
    }));
    
    console.log('🏛️ Embassy verification complete:', response);
  }

  // Chainlink Oracle integration for fraud detection
  async requestFraudDetection(credentialData) {
    try {
      console.log('🔍 Requesting fraud detection analysis...');
      
      // Simulate Chainlink Oracle request
      const fraudAnalysis = {
        credentialHash: await this.createCredentialHash(credentialData),
        riskScore: Math.random() * 100, // 0-100 risk score
        anomalies: this.detectAnomalies(credentialData),
        timestamp: Date.now(),
        oracleVersion: '1.0.0'
      };
      
      // Determine fraud likelihood
      if (fraudAnalysis.riskScore > 80) {
        fraudAnalysis.status = 'high_risk';
        fraudAnalysis.recommendation = 'Requires manual review';
      } else if (fraudAnalysis.riskScore > 50) {
        fraudAnalysis.status = 'medium_risk';
        fraudAnalysis.recommendation = 'Additional verification recommended';
      } else {
        fraudAnalysis.status = 'low_risk';
        fraudAnalysis.recommendation = 'Credential appears authentic';
      }
      
      console.log('🔍 Fraud detection complete:', fraudAnalysis);
      return fraudAnalysis;
      
    } catch (error) {
      console.error('Fraud detection failed:', error);
      throw error;
    }
  }

  detectAnomalies(credentialData) {
    const anomalies = [];
    
    // Check for common anomalies
    if (credentialData.issueDate && new Date(credentialData.issueDate) > new Date()) {
      anomalies.push('Future issue date detected');
    }
    
    if (credentialData.gpa && (credentialData.gpa > 4.5 || credentialData.gpa < 0)) {
      anomalies.push('Unusual GPA value');
    }
    
    if (credentialData.studentName && credentialData.studentName.length < 2) {
      anomalies.push('Suspicious student name format');
    }
    
    if (credentialData.issuer && !credentialData.issuer.includes('.')) {
      anomalies.push('Non-standard issuer format');
    }
    
    return anomalies;
  }

  // Utility methods for simulation
  async simulateBlockchainTransaction(method, params) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      tokenId: Math.floor(Math.random() * 1000000),
      gasUsed: Math.floor(Math.random() * 100000) + 50000,
      status: 'success'
    };
  }

  async simulateBlockchainQuery(method, params) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if credential exists in cache
    const credentialExists = this.getCredentialFromCache(params[0]) !== null;
    
    return {
      exists: credentialExists,
      metadata: credentialExists ? {
        timestamp: Date.now() - Math.random() * 1000000000,
        verificationLevel: Math.floor(Math.random() * 4)
      } : null
    };
  }

  async simulateNFTMinting(recipientAddress, ipfsHash, credentialHash) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const tokenId = Math.floor(Math.random() * 1000000);
    
    // Store NFT data
    const nftData = {
      tokenId: tokenId,
      owner: recipientAddress,
      tokenURI: `${this.ipfsGateway}${ipfsHash}`,
      credentialHash: credentialHash,
      mintTimestamp: Date.now()
    };
    
    const storedNFTs = JSON.parse(localStorage.getItem('civoraCredentialNFTs') || '[]');
    storedNFTs.push(nftData);
    localStorage.setItem('civoraCredentialNFTs', JSON.stringify(storedNFTs));
    
    return {
      tokenId: tokenId,
      txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };
  }

  async uploadToIPFS(data) {
    // Simulate IPFS upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock IPFS hash
    const ipfsHash = 'Qm' + Array.from({length: 44}, () => 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        .charAt(Math.floor(Math.random() * 62))
    ).join('');
    
    // Store data locally for simulation
    localStorage.setItem(`ipfs_${ipfsHash}`, JSON.stringify(data));
    
    return ipfsHash;
  }

  // Local caching methods
  cacheCredential(credentialHash, credentialData, metadata) {
    const cacheData = {
      credentialHash: credentialHash,
      credentialData: credentialData,
      metadata: metadata,
      timestamp: Date.now()
    };
    
    const cached = JSON.parse(localStorage.getItem('civoraCredentialCache') || '[]');
    cached.push(cacheData);
    localStorage.setItem('civoraCredentialCache', JSON.stringify(cached));
  }

  getCredentialFromCache(credentialHash) {
    const cached = JSON.parse(localStorage.getItem('civoraCredentialCache') || '[]');
    const found = cached.find(item => item.credentialHash === credentialHash);
    return found ? found.credentialData : null;
  }

  // User credential management
  async getUserCredentials(userAddress) {
    if (!userAddress && !this.userAccount) {
      throw new Error('No user address provided');
    }
    
    const address = userAddress || this.userAccount;
    const cached = JSON.parse(localStorage.getItem('civoraCredentialCache') || '[]');
    const nfts = JSON.parse(localStorage.getItem('civoraCredentialNFTs') || '[]');
    
    // Filter credentials for the user
    const userCredentials = cached.filter(cred => 
      cred.metadata && cred.metadata.did === this.generateDID(address)
    );
    
    const userNFTs = nfts.filter(nft => 
      nft.owner.toLowerCase() === address.toLowerCase()
    );
    
    return {
      credentials: userCredentials,
      nfts: userNFTs,
      totalCount: userCredentials.length + userNFTs.length
    };
  }

  // Generate shareable verification link
  generateVerificationLink(credentialHash) {
    const baseUrl = window.location.origin;
    return `${baseUrl}/verify-credential.html?hash=${credentialHash}`;
  }

  // Export credential for sharing
  async exportCredential(credentialHash, format = 'json') {
    const verification = await this.verifyCredential(credentialHash);
    
    if (!verification.isValid) {
      throw new Error('Cannot export invalid credential');
    }
    
    const exportData = {
      credentialHash: credentialHash,
      credentialData: verification.credentialData,
      metadata: verification.metadata,
      verificationStatus: 'verified',
      exportTimestamp: Date.now(),
      verificationLink: this.generateVerificationLink(credentialHash)
    };
    
    switch (format) {
      case 'json':
        return JSON.stringify(exportData, null, 2);
      case 'pdf':
        return await this.generateCredentialPDF(exportData);
      default:
        return exportData;
    }
  }

  async generateCredentialPDF(credentialData) {
    // For demo purposes, return a data URL
    // In real implementation, this would generate actual PDF
    return `data:application/pdf;base64,${btoa('PDF content would be here')}`;
  }

  getVerificationLevelName(level) {
    const names = {
      0: 'Self-Attested',
      1: 'Institution Verified',
      2: 'Third Party Audited',
      3: 'Embassy Endorsed'
    };
    return names[level] || 'Unknown';
  }

  // Public API methods for UI integration
  async uploadCredentialFile(file, credentialType) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const credentialData = {
            type: credentialType,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploadDate: Date.now(),
            content: e.target.result,
            studentName: 'Current User', // Would be filled from user profile
            issuer: 'User Upload'
          };
          
          const result = await this.storeCredential(credentialData);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  // Integration with Civora AI Oracle
  async reportCredentialToAI(credentialHash, credentialData) {
    if (window.supremeAIOracle) {
      try {
        await window.supremeAIOracle.analyzeCredential({
          hash: credentialHash,
          type: credentialData.type,
          issuer: credentialData.issuer,
          verificationLevel: credentialData.verificationLevel,
          timestamp: Date.now()
        });
      } catch (error) {
        console.warn('Failed to report credential to AI Oracle:', error);
      }
    }
  }
}

// Global instance
window.blockchainCredentials = null;

// Load Web3 library and initialize
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load Web3.js library if not already loaded
    if (!window.Web3) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/web3@1.10.0/dist/web3.min.js';
      script.onload = async () => {
        window.blockchainCredentials = await new BlockchainCredentialVault().init();
        console.log('🛡️ Blockchain Credential Vault ready');
        
        // Trigger initialization event
        window.dispatchEvent(new CustomEvent('blockchainCredentialsReady', {
          detail: { vault: window.blockchainCredentials }
        }));
      };
      document.head.appendChild(script);
    } else {
      window.blockchainCredentials = await new BlockchainCredentialVault().init();
      console.log('🛡️ Blockchain Credential Vault ready');
    }
  } catch (error) {
    console.error('Failed to initialize blockchain credentials:', error);
  }
});