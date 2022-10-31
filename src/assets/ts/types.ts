interface BookMarks {
  title: string;
  brief?: string;
  link?: string;
  // URL
  favicon?: string;
  // Emoji icons
  menuIcon?: string;
  items?: BookMarks[];
}

interface oneBookMark extends BookMarks {
  link: string;
}

interface mutiBookMark extends BookMarks {
  items?: BookMarks[];
}

export type { BookMarks, oneBookMark, mutiBookMark };
