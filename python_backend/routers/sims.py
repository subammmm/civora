"""
Monte Carlo simulation routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from database import get_db
from models import (
    User,
    Simulation,
    TaxSimulationRequest,
    CitizenshipSimulationRequest,
    SimulationResponse
)
from routers.users import get_current_user
from services.sim_service import (
    simulate_tax_savings,
    simulate_citizenship_path,
    simulate_wealth_optimization
)
from utils import logger, error_response, success_response

router = APIRouter(prefix="/sims", tags=["simulations"])

# ============================================================================
# Routes
# ============================================================================

@router.post("/tax", response_model=SimulationResponse)
async def run_tax_simulation(
    request: TaxSimulationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Run Monte Carlo simulation for tax savings by relocating
    
    Args:
        request: Tax simulation parameters
        current_user: Authenticated user
        db: Database session
        
    Returns:
        Simulation results with expected value, probabilities, and visualization data
    """
    try:
        logger.info(f"Tax simulation for user {current_user.email}: "
                   f"{request.current_country} -> {request.target_country}")
        
        # Run simulation
        result = simulate_tax_savings(
            current_country=request.current_country,
            target_country=request.target_country,
            annual_income=request.annual_income,
            years=request.years_to_simulate,
            investment_rate=request.investment_rate,
            num_simulations=1000
        )
        
        # Save simulation to database
        simulation = Simulation(
            id=uuid.uuid4(),
            user_id=current_user.id,
            type="tax",
            input_json={
                "current_country": request.current_country,
                "target_country": request.target_country,
                "annual_income": request.annual_income,
                "years_to_simulate": request.years_to_simulate,
                "investment_rate": request.investment_rate
            },
            output_json=result,
            ran_at=datetime.utcnow()
        )
        
        db.add(simulation)
        db.commit()
        db.refresh(simulation)
        
        # Return response
        return SimulationResponse(
            id=str(simulation.id),
            type="tax",
            expected_value=result["expected_value"],
            std_deviation=result["std_deviation"],
            percentile_25=result["percentile_25"],
            percentile_50=result["percentile_50"],
            percentile_75=result["percentile_75"],
            success_probability=result["success_probability"],
            visualization_data=result["visualization_data"],
            ran_at=simulation.ran_at
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Tax simulation error: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Tax simulation failed: {str(e)}"
        )

@router.post("/citizenship", response_model=SimulationResponse)
async def run_citizenship_simulation(
    request: CitizenshipSimulationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Run Monte Carlo simulation for citizenship path timeline and success probability
    
    Args:
        request: Citizenship simulation parameters
        current_user: Authenticated user
        db: Database session
        
    Returns:
        Simulation results with expected timeline, success probability, and path options
    """
    try:
        logger.info(f"Citizenship simulation for user {current_user.email}: "
                   f"{request.current_country} -> {request.target_country}")
        
        # Run simulation
        result = simulate_citizenship_path(
            current_country=request.current_country,
            target_country=request.target_country,
            education_level=request.education_level,
            work_experience_years=request.work_experience_years,
            language_proficiency=request.language_proficiency,
            investment_available=request.investment_available,
            num_simulations=1000
        )
        
        # Save simulation to database
        simulation = Simulation(
            id=uuid.uuid4(),
            user_id=current_user.id,
            type="citizenship",
            input_json={
                "current_country": request.current_country,
                "target_country": request.target_country,
                "education_level": request.education_level,
                "work_experience_years": request.work_experience_years,
                "language_proficiency": request.language_proficiency,
                "investment_available": request.investment_available
            },
            output_json=result,
            ran_at=datetime.utcnow()
        )
        
        db.add(simulation)
        db.commit()
        db.refresh(simulation)
        
        # Return response
        return SimulationResponse(
            id=str(simulation.id),
            type="citizenship",
            expected_value=result["expected_value"],
            std_deviation=result["std_deviation"],
            percentile_25=result["percentile_25"],
            percentile_50=result["percentile_50"],
            percentile_75=result["percentile_75"],
            success_probability=result["success_probability"],
            visualization_data=result["visualization_data"],
            ran_at=simulation.ran_at
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Citizenship simulation error: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Citizenship simulation failed: {str(e)}"
        )

@router.post("/wealth")
async def run_wealth_simulation(
    current_wealth: float,
    annual_income: float,
    years: int = 20,
    savings_rate: float = 0.2,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Run Monte Carlo simulation for wealth accumulation strategies
    
    Args:
        current_wealth: Current wealth in USD
        annual_income: Annual income in USD
        years: Number of years to simulate
        savings_rate: Percentage of income saved (0-1)
        current_user: Authenticated user
        db: Database session
        
    Returns:
        Simulation results comparing different investment strategies
    """
    try:
        logger.info(f"Wealth simulation for user {current_user.email}")
        
        # Run simulation
        result = simulate_wealth_optimization(
            current_wealth=current_wealth,
            annual_income=annual_income,
            years=years,
            savings_rate=savings_rate,
            investment_strategies=["conservative", "balanced", "aggressive"],
            num_simulations=1000
        )
        
        # Save simulation to database
        simulation = Simulation(
            id=uuid.uuid4(),
            user_id=current_user.id,
            type="wealth",
            input_json={
                "current_wealth": current_wealth,
                "annual_income": annual_income,
                "years": years,
                "savings_rate": savings_rate
            },
            output_json=result,
            ran_at=datetime.utcnow()
        )
        
        db.add(simulation)
        db.commit()
        db.refresh(simulation)
        
        # Return success response with details
        return success_response(
            data={
                "id": str(simulation.id),
                "type": "wealth",
                "expected_value": result["expected_value"],
                "std_deviation": result["std_deviation"],
                "percentile_25": result["percentile_25"],
                "percentile_50": result["percentile_50"],
                "percentile_75": result["percentile_75"],
                "success_probability": result["success_probability"],
                "details": result["details"],
                "ran_at": simulation.ran_at.isoformat()
            },
            message="Wealth simulation completed successfully"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Wealth simulation error: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Wealth simulation failed: {str(e)}"
        )

@router.get("/history")
async def get_simulation_history(
    limit: int = 10,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get user's simulation history
    
    Args:
        limit: Number of simulations to return
        current_user: Authenticated user
        db: Database session
        
    Returns:
        List of past simulations
    """
    try:
        simulations = db.query(Simulation).filter(
            Simulation.user_id == current_user.id
        ).order_by(
            Simulation.ran_at.desc()
        ).limit(limit).all()
        
        results = [
            {
                "id": str(sim.id),
                "type": sim.type,
                "input": sim.input_json,
                "output": sim.output_json,
                "ran_at": sim.ran_at.isoformat()
            }
            for sim in simulations
        ]
        
        return success_response(
            data=results,
            message=f"Retrieved {len(results)} simulations"
        )
    
    except Exception as e:
        logger.error(f"Simulation history error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve simulation history"
        )
