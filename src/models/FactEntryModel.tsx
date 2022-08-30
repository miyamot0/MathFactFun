import firebase from "firebase/app";

export interface FactDataInterface {
  // Bools
  factCorrect?: boolean;
  initialTry?: boolean;

  // Strings
  factType?: string;
  factString?: string;
  factEntry?: string;

  // Numerics
  latencySeconds?: number;

  // Timestamps
  dateTimeEnd?: firebase.firestore.Timestamp;
  dateTimeStart?: firebase.firestore.Timestamp;
}

export interface FactModelInterface {
  data: FactDataInterface;
  CheckObject: () => boolean;
  SubmitObject: () => FactDataInterface;
}

export function FactEntryModel(): FactModelInterface {
  return {
    data: {
      // Bools
      factCorrect: null,
      initialTry: null,

      // Strings
      factType: null,
      factString: null,
      factEntry: null,

      // Numerics
      latencySeconds: null,

      // Timestamps
      dateTimeEnd: null,
      dateTimeStart: null,
    } as FactDataInterface,
    CheckObject: function (): boolean {
      if (typeof this.data.factCorrect !== "boolean") return false;
      if (typeof this.data.initialTry !== "boolean") return false;

      if (typeof this.data.factType !== "string") return false;
      if (typeof this.data.factString !== "string") return false;
      if (typeof this.data.factEntry !== "string") return false;

      if (typeof this.data.latencySeconds !== "number") return false;

      if (!(this.data.dateTimeStart instanceof firebase.firestore.Timestamp))
        return false;
      if (!(this.data.dateTimeEnd instanceof firebase.firestore.Timestamp))
        return false;

      return true;
    },
    SubmitObject: function (): FactDataInterface {
      return this.data as FactDataInterface;
    },
  };
}
