"""
Monte Carlo simulation service for tax, citizenship, and wealth optimization

Uses NumPy for efficient numerical computations
"""
import numpy as np
from typing import Dict, Any, List, Tuple
from datetime import datetime
import json

from utils import logger

# ============================================================================
# Tax Simulation
# ============================================================================

def simulate_tax_savings(
    current_country: str,
    target_country: str,
    annual_income: float,
    years: int = 10,
    investment_rate: float = 0.05,
    num_simulations: int = 1000
) -> Dict[str, Any]:
    """
    Monte Carlo simulation for tax savings by relocating
    
    Args:
        current_country: Current country of residence
        target_country: Target country to move to
        annual_income: Annual income in USD
        years: Number of years to simulate
        investment_rate: Expected annual investment return
        num_simulations: Number of Monte Carlo iterations
        
    Returns:
        Dictionary with simulation results
    """
    logger.info(f"Running tax simulation: {current_country} -> {target_country}")
    
    # Tax rates (simplified - in production, use real tax data)
    tax_rates = {
        "United States": 0.25,
        "United Kingdom": 0.28,
        "Canada": 0.26,
        "Germany": 0.30,
        "Singapore": 0.17,
        "UAE": 0.0,
        "Switzerland": 0.22,
        "Australia": 0.27,
        "New Zealand": 0.28,
        "Nepal": 0.25,
        "India": 0.30
    }
    
    current_tax_rate = tax_rates.get(current_country, 0.25)
    target_tax_rate = tax_rates.get(target_country, 0.25)
    
    # Arrays to store simulation results
    results = []
    
    for _ in range(num_simulations):
        # Random variations in income growth (mean 3%, std 2%)
        income_growth = np.random.normal(0.03, 0.02, years)
        
        # Random variations in investment returns
        investment_returns = np.random.normal(investment_rate, 0.03, years)
        
        # Calculate cumulative wealth in both scenarios
        current_wealth = 0
        target_wealth = 0
        income = annual_income
        
        for year in range(years):
            # Apply income growth
            income *= (1 + income_growth[year])
            
            # Calculate after-tax income
            current_after_tax = income * (1 - current_tax_rate)
            target_after_tax = income * (1 - target_tax_rate)
            
            # Add to wealth and apply investment returns
            current_wealth = (current_wealth + current_after_tax) * (1 + investment_returns[year])
            target_wealth = (target_wealth + target_after_tax) * (1 + investment_returns[year])
        
        # Tax savings over the period
        savings = target_wealth - current_wealth
        results.append(savings)
    
    results = np.array(results)
    
    # Calculate statistics
    expected_value = float(np.mean(results))
    std_deviation = float(np.std(results))
    percentile_25 = float(np.percentile(results, 25))
    percentile_50 = float(np.percentile(results, 50))
    percentile_75 = float(np.percentile(results, 75))
    success_probability = float(np.sum(results > 0) / num_simulations)
    
    # Create histogram data for visualization
    hist, bins = np.histogram(results, bins=50)
    visualization_data = [
        {"bin": float((bins[i] + bins[i+1]) / 2), "count": int(hist[i])}
        for i in range(len(hist))
    ]
    
    return {
        "expected_value": expected_value,
        "std_deviation": std_deviation,
        "percentile_25": percentile_25,
        "percentile_50": percentile_50,
        "percentile_75": percentile_75,
        "success_probability": success_probability,
        "visualization_data": visualization_data,
        "details": {
            "current_country": current_country,
            "target_country": target_country,
            "current_tax_rate": current_tax_rate,
            "target_tax_rate": target_tax_rate,
            "years_simulated": years,
            "num_simulations": num_simulations
        }
    }

# ============================================================================
# Citizenship Path Simulation
# ============================================================================

def simulate_citizenship_path(
    current_country: str,
    target_country: str,
    education_level: str,
    work_experience_years: int,
    language_proficiency: str,
    investment_available: float = 0,
    num_simulations: int = 1000
) -> Dict[str, Any]:
    """
    Monte Carlo simulation for citizenship path timeline and success
    
    Args:
        current_country: Current nationality
        target_country: Target country for citizenship
        education_level: Education level (Bachelor, Master, PhD)
        work_experience_years: Years of work experience
        language_proficiency: Language proficiency level
        investment_available: Available investment amount (for investor visas)
        num_simulations: Number of Monte Carlo iterations
        
    Returns:
        Dictionary with simulation results
    """
    logger.info(f"Running citizenship simulation: {current_country} -> {target_country}")
    
    # Base probabilities and timelines for different paths
    paths = {
        "work_visa": {
            "base_probability": 0.6,
            "base_timeline_years": 5,
            "variance": 2
        },
        "skilled_migration": {
            "base_probability": 0.5,
            "base_timeline_years": 3,
            "variance": 1
        },
        "student_visa": {
            "base_probability": 0.7,
            "base_timeline_years": 6,
            "variance": 1.5
        },
        "investor_visa": {
            "base_probability": 0.8,
            "base_timeline_years": 2,
            "variance": 0.5,
            "min_investment": 500000
        }
    }
    
    # Modifiers based on profile
    education_modifier = {
        "High School": 0.8,
        "Associate": 0.9,
        "Bachelor": 1.0,
        "Master": 1.1,
        "PhD": 1.2
    }.get(education_level, 1.0)
    
    experience_modifier = min(1.0 + (work_experience_years * 0.05), 1.5)
    
    language_modifier = {
        "None": 0.7,
        "Basic": 0.8,
        "Intermediate": 0.9,
        "Advanced": 1.0,
        "Native": 1.1
    }.get(language_proficiency, 0.9)
    
    # Determine available paths
    available_paths = []
    for path_name, path_data in paths.items():
        if path_name == "investor_visa":
            if investment_available >= path_data["min_investment"]:
                available_paths.append(path_name)
        else:
            available_paths.append(path_name)
    
    # Run simulations
    results = []
    success_counts = {path: 0 for path in available_paths}
    timeline_results = {path: [] for path in available_paths}
    
    for _ in range(num_simulations):
        # Randomly choose a path (weighted by probability)
        path_probs = [
            paths[p]["base_probability"] * education_modifier * 
            experience_modifier * language_modifier
            for p in available_paths
        ]
        
        # Normalize probabilities
        total_prob = sum(path_probs)
        if total_prob > 0:
            path_probs = [p / total_prob for p in path_probs]
            chosen_path = np.random.choice(available_paths, p=path_probs)
        else:
            chosen_path = available_paths[0] if available_paths else "work_visa"
        
        # Simulate success
        path_data = paths[chosen_path]
        success_prob = min(
            path_data["base_probability"] * 
            education_modifier * 
            experience_modifier * 
            language_modifier,
            0.95
        )
        
        success = np.random.random() < success_prob
        
        # Simulate timeline
        timeline = np.random.normal(
            path_data["base_timeline_years"],
            path_data["variance"]
        )
        timeline = max(timeline, 1)  # Minimum 1 year
        
        results.append({
            "path": chosen_path,
            "success": success,
            "timeline_years": timeline
        })
        
        if success:
            success_counts[chosen_path] += 1
            timeline_results[chosen_path].append(timeline)
    
    # Calculate statistics
    total_success = sum(1 for r in results if r["success"])
    success_probability = total_success / num_simulations
    
    timelines = [r["timeline_years"] for r in results if r["success"]]
    if timelines:
        expected_timeline = float(np.mean(timelines))
        timeline_std = float(np.std(timelines))
        timeline_25 = float(np.percentile(timelines, 25))
        timeline_50 = float(np.percentile(timelines, 50))
        timeline_75 = float(np.percentile(timelines, 75))
    else:
        expected_timeline = timeline_std = timeline_25 = timeline_50 = timeline_75 = 0
    
    # Create visualization data
    hist, bins = np.histogram(timelines, bins=30) if timelines else (np.array([]), np.array([]))
    visualization_data = [
        {"bin": float((bins[i] + bins[i+1]) / 2), "count": int(hist[i])}
        for i in range(len(hist))
    ]
    
    # Path statistics
    path_stats = []
    for path in available_paths:
        if timeline_results[path]:
            path_stats.append({
                "path": path,
                "success_rate": success_counts[path] / num_simulations,
                "avg_timeline": float(np.mean(timeline_results[path])),
                "chosen_count": len(timeline_results[path])
            })
    
    return {
        "expected_value": expected_timeline,
        "std_deviation": timeline_std,
        "percentile_25": timeline_25,
        "percentile_50": timeline_50,
        "percentile_75": timeline_75,
        "success_probability": success_probability,
        "visualization_data": visualization_data,
        "details": {
            "current_country": current_country,
            "target_country": target_country,
            "available_paths": available_paths,
            "path_statistics": path_stats,
            "education_modifier": education_modifier,
            "experience_modifier": experience_modifier,
            "language_modifier": language_modifier,
            "num_simulations": num_simulations
        }
    }

# ============================================================================
# Wealth Optimization Simulation
# ============================================================================

def simulate_wealth_optimization(
    current_wealth: float,
    annual_income: float,
    years: int = 20,
    savings_rate: float = 0.2,
    investment_strategies: List[str] = None,
    num_simulations: int = 1000
) -> Dict[str, Any]:
    """
    Monte Carlo simulation for wealth accumulation strategies
    
    Args:
        current_wealth: Current wealth in USD
        annual_income: Annual income in USD
        years: Number of years to simulate
        savings_rate: Percentage of income saved (0-1)
        investment_strategies: List of investment strategies to compare
        num_simulations: Number of Monte Carlo iterations
        
    Returns:
        Dictionary with simulation results
    """
    if investment_strategies is None:
        investment_strategies = ["conservative", "balanced", "aggressive"]
    
    logger.info(f"Running wealth optimization simulation for {years} years")
    
    # Investment strategy parameters (mean return, std deviation)
    strategy_params = {
        "conservative": (0.05, 0.03),  # 5% mean, 3% std
        "balanced": (0.08, 0.08),      # 8% mean, 8% std
        "aggressive": (0.12, 0.15)     # 12% mean, 15% std
    }
    
    strategy_results = {}
    
    for strategy in investment_strategies:
        mean_return, std_return = strategy_params.get(strategy, (0.07, 0.10))
        
        results = []
        
        for _ in range(num_simulations):
            wealth = current_wealth
            
            for year in range(years):
                # Random return for this year
                annual_return = np.random.normal(mean_return, std_return)
                
                # Add savings
                annual_savings = annual_income * savings_rate
                wealth += annual_savings
                
                # Apply investment return
                wealth *= (1 + annual_return)
                
                # Ensure non-negative
                wealth = max(wealth, 0)
            
            results.append(wealth)
        
        results = np.array(results)
        
        # Calculate statistics
        strategy_results[strategy] = {
            "expected_value": float(np.mean(results)),
            "std_deviation": float(np.std(results)),
            "percentile_25": float(np.percentile(results, 25)),
            "percentile_50": float(np.percentile(results, 50)),
            "percentile_75": float(np.percentile(results, 75)),
            "min": float(np.min(results)),
            "max": float(np.max(results))
        }
    
    # Find best strategy based on expected value
    best_strategy = max(strategy_results.items(), key=lambda x: x[1]["expected_value"])
    
    # Create visualization data for best strategy
    best_results = strategy_results[best_strategy[0]]
    
    return {
        "expected_value": best_results["expected_value"],
        "std_deviation": best_results["std_deviation"],
        "percentile_25": best_results["percentile_25"],
        "percentile_50": best_results["percentile_50"],
        "percentile_75": best_results["percentile_75"],
        "success_probability": 1.0,  # Always succeeds (wealth >= 0)
        "visualization_data": [],  # Can be populated with time series data
        "details": {
            "best_strategy": best_strategy[0],
            "all_strategies": strategy_results,
            "years": years,
            "initial_wealth": current_wealth,
            "annual_income": annual_income,
            "savings_rate": savings_rate,
            "num_simulations": num_simulations
        }
    }

# ============================================================================
# Service initialization
# ============================================================================

# Initialize numpy random seed for reproducibility in tests
np.random.seed(42)
