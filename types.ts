export type ChangeType = "Fix" | "Enhancement" | "Breaking";

type ChangeDetails = {
  /** Type of change */
  changeType: ChangeType;

  /** Describe the change details. */
  desc: React.ReactNode;

  /** Optional PR number. If left blank, is read from the filename. */
  pr?: number;
};

export type ReleaseNote = {
  /** Describe the change details. */
  details: ChangeDetails[];

  /** If non-component change, use this to specify the item/area changed */
  topic?: string;
};

export type Release = {
  changes: ReleaseNote[];
  tag: string;
};
