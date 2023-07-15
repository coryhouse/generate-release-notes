export type ChangeType = "Fix" | "Enhancement" | "Breaking";

export type Release = {
  /** Array of release notes for a given release */
  releaseNotes: ReleaseNote[];

  /** Release version number */
  tag: string;
};

type ReleaseNote = {
  /** Type of change */
  type: ChangeType;

  /** Describe the change details. */
  description: string;

  /** Optional PR number. If left blank, is read from the filename. */
  pr?: number;
};
