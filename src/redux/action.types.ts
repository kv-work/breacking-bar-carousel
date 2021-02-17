interface Action<TPayload> {
  type: string;
  payload?: TPayload;
}

export default Action;
