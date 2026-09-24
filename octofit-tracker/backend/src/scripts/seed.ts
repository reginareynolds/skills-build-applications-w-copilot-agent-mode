import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex@example.com', displayName: 'Alex Rivera', password: 'demo-password', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
      { username: 'jamie.lifts', email: 'jamie@example.com', displayName: 'Jamie Chen', password: 'demo-password', avatarUrl: 'https://i.pravatar.cc/150?img=32' },
      { username: 'sam.yoga', email: 'sam@example.com', displayName: 'Sam Patel', password: 'demo-password', avatarUrl: 'https://i.pravatar.cc/150?img=47' },
    ]);

    const teams = await Team.create([
      { name: 'Summit Striders', description: 'A friendly team chasing consistent outdoor miles.', members: [users[0]._id, users[2]._id], totalPoints: 420 },
      { name: 'Iron Circuit', description: 'Strength, conditioning, and steady progress.', members: [users[1]._id], totalPoints: 360 },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 42, distanceKm: 7.2, calories: 510, points: 120, completedAt: new Date('2026-09-22T07:30:00Z') },
      { user: users[1]._id, type: 'strength', durationMinutes: 55, calories: 390, points: 110, completedAt: new Date('2026-09-22T18:00:00Z') },
      { user: users[2]._id, type: 'yoga', durationMinutes: 30, calories: 140, points: 70, completedAt: new Date('2026-09-23T06:45:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 120, rank: 1, weekStarting: new Date('2026-09-21T00:00:00Z') },
      { user: users[1]._id, team: teams[1]._id, points: 110, rank: 2, weekStarting: new Date('2026-09-21T00:00:00Z') },
      { user: users[2]._id, team: teams[0]._id, points: 70, rank: 3, weekStarting: new Date('2026-09-21T00:00:00Z') },
    ]);

    await Workout.create([
      {
        title: 'Trail Builder', description: 'Build leg endurance with a balanced hill session.', category: 'cardio', difficulty: 'intermediate', durationMinutes: 35,
        exercises: [{ name: 'Incline walk', sets: 1, reps: 1, restSeconds: 60 }, { name: 'Hill repeats', sets: 6, reps: 1, restSeconds: 90 }],
      },
      {
        title: 'Full-Body Foundation', description: 'A practical strength session for the whole body.', category: 'strength', difficulty: 'beginner', durationMinutes: 30,
        exercises: [{ name: 'Bodyweight squat', sets: 3, reps: 12, restSeconds: 45 }, { name: 'Push-up', sets: 3, reps: 8, restSeconds: 45 }, { name: 'Dead bug', sets: 3, reps: 10, restSeconds: 30 }],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
