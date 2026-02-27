interface Person {
  id: number;
  url: string;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  };
  birthday: string;
  deathday: string | null;
  gender: string;
  image: {
    medium: string;
    original: string;
  };
  updated: number;
  _links: {
    self: {
      href: string;
    };
  };
}

interface Character {
  id: number;
  url: string;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  _links: {
    self: {
      href: string;
    };
  };
}

export interface Cast {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}
