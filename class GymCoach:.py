class GymCoach:
    def __init__(self):
        self.clients = {}
        self.workouts = {}

    def add_client(self, name, age, goals):
        self.clients[name] = {'age': age, 'goals': goals}

    def create_workout(self, client_name, exercises):
        if client_name in self.clients:
            self.workouts[client_name] = exercises
            print(f"Workout created for {client_name}")
        else:
            print("Client not found")

    def get_workout(self, client_name):
        return self.workouts.get(client_name, "No workout found")

# Example usage
coach = GymCoach()
coach.add_client("John", 30, "Build muscle")
coach.create_workout("John", ["Push-ups", "Squats", "Bench Press"])
print(coach.get_workout("John"))