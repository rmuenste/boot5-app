export interface LogData {
  wordId: string;
  result: Boolean;
}

export interface LogArray {
  wordStatistics: Array<any>;
  dictId: string;
}

export interface dictionaryId {
  _id: string;
  name: string;
}
/*
const userSchema = new Schema<User, UserModel>({
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
  },
  name: {
      type: String,
      required: false,
      minLength: 3
  },
  password: {
      type: String,
      required: true,
      minLength: 8
  },
  wordStatistics: [{
    wordId: mongoose.ObjectId,
    percentage: Number,
    repetitions: Number,
    correct: Number
  }]
});
*/
