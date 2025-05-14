import mongoose, { Document, Schema } from "mongoose";

enum plan {
  FREE = "FREE",
  PRO = "PRO",
  AGENCY = "AGENCY",
}

enum tone {
  FRIENDLY = "FRIENDLY",
  PROFESSIONAL = "PROFESSIONAL",
  APOLOGETIC = "APOLOGETIC",
}

export interface userInterface extends Document {
  googleId: String;
  name: String;
  email: String;
  accessToken: String;
  RefreshToken: String;
  plan: plan;
  preferences: object;
}

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  plan: {
    type: String,
    enum: Object.values(plan),
    default: plan.FREE,
  },
  preferences: {
    tone: {
      type: String,
      enum: Object.values(tone),
      default: tone.FRIENDLY,
    },
    autoReply: {
      type: Boolean,
    },
  },
});

export default mongoose.model<userInterface>("user", userSchema, "user");
