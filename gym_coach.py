import argparse
import random

WORKOUT_PLANS = {
    "strength": [
        "3x5 squats, 3x5 bench press, 3x5 deadlift",
        "3x5 overhead press, 3x5 barbell row, 3x8 lunges",
        "5x5 front squat, 5x5 incline press, 3x8 Romanian deadlift",
    ],
    "hypertrophy": [
        "4x12 chest press, 4x12 dumbbell row, 4x15 goblet squat",
        "4x10 leg press, 4x12 cable fly, 4x12 lat pulldown",
        "4x12 Romanian deadlift, 4x12 shoulder press, 4x15 leg curl",
    ],
    "endurance": [
        "30 minutes steady-state cardio, 3x15 bodyweight squats, 3x20 sit-ups",
        "4 rounds: 10 burpees, 15 kettlebell swings, 20 walking lunges",
        "20 minutes interval run, 3x15 mountain climbers, 3x12 plank rows",
    ],
}

EQUIPMENT_HINTS = {
    "bodyweight": "Focus on bodyweight movements and higher reps.",
    "dumbbells": "Use dumbbells for presses, rows, and split squats.",
    "barbell": "Barbell lifts are great for strength and progressive overload.",
    "machines": "Machines can help isolate muscles and control volume.",
}


def get_workout(goal: str, equipment: str, days: int) -> str:
    plan = WORKOUT_PLANS.get(goal, WORKOUT_PLANS["strength"])
    workout = random.choice(plan)
    equipment_tip = EQUIPMENT_HINTS.get(equipment.lower(), "Use any available equipment and keep good form.")
    return (
        f"Gym Coach Recommendation:\n"
        f"Goal: {goal.title()}\n"
        f"Equipment: {equipment.title()}\n"
        f"Training Days: {days} per week\n\n"
        f"Suggested Workout:\n{workout}\n\n"
        f"Tip: {equipment_tip}\n"
        f"Progression: Increase weight, reps, or rounds gradually each week."
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Simple Gym Coach CLI: get a workout recommendation based on goal and equipment."
    )
    parser.add_argument(
        "--goal",
        choices=["strength", "hypertrophy", "endurance"],
        default="strength",
        help="Your primary training goal.",
    )
    parser.add_argument(
        "--equipment",
        choices=["bodyweight", "dumbbells", "barbell", "machines"],
        default="dumbbells",
        help="The equipment you have access to.",
    )
    parser.add_argument(
        "--days",
        type=int,
        default=3,
        choices=range(1, 8),
        help="Number of training days per week.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    print(get_workout(args.goal, args.equipment, args.days))


if __name__ == "__main__":
    main()
