import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
	username: { type: String, required: true, unique: true, trim: true },
	email: { type: String, required: true, unique: true, trim: true, lowercase: true },
	displayName: { type: String, required: true, trim: true },
	password: { type: String, required: true, select: false },
	avatarUrl: String,
}, { timestamps: true })

const teamSchema = new Schema({
	name: { type: String, required: true, trim: true },
	description: { type: String, required: true },
	members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	totalPoints: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true })

const activitySchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	type: { type: String, required: true, enum: ['running', 'cycling', 'strength', 'yoga', 'swimming', 'walking'] },
	durationMinutes: { type: Number, required: true, min: 1 },
	distanceKm: { type: Number, min: 0 },
	calories: { type: Number, required: true, min: 0 },
	points: { type: Number, required: true, min: 0 },
	completedAt: { type: Date, required: true },
}, { timestamps: true })

const leaderboardSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
	points: { type: Number, required: true, min: 0 },
	rank: { type: Number, required: true, min: 1 },
	weekStarting: { type: Date, required: true },
}, { timestamps: true })

const workoutSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true, enum: ['strength', 'cardio', 'flexibility', 'recovery'] },
	difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
	durationMinutes: { type: Number, required: true, min: 1 },
	exercises: [{
		name: { type: String, required: true },
		sets: { type: Number, required: true, min: 1 },
		reps: { type: Number, min: 1 },
		restSeconds: { type: Number, required: true, min: 0 },
	}],
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)