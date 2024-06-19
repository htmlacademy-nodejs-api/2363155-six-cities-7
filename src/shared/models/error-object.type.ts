type Constraint = {
  name: string;
  message: string;
  type: string;
};

interface ErrorObject {
  title: string;
  reference?: string;
  detail?: string;
  constraints?: Constraint[];
}

export type { ErrorObject };
