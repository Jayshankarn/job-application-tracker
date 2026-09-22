import mongoose, { Schema } from "mongoose";

export interface JobApplication {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status?: string;
  columnId?: string;
  boardId?: string;
  userId?: string;
  order: number;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  appliedDate?: Date;
  tags?: string[];
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Column {
  _id: string;
  name: string;
  boardId?: string;
  order: number;
  jobApplications: JobApplication[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Board {
  _id: string;
  name: string;
  userId: string;
  columns: Column[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IJobApplication extends JobApplication {}
export interface IColumn extends Column {}
export interface IBoard extends Board {}

const BoardSchema = new Schema<IBoard>({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  columns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Column",
    },
  ],
}, {
  timestamps: true,
});

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema);