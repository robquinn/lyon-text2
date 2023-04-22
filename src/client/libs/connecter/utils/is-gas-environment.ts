const isGASEnvironment = (): boolean =>
  typeof google !== 'undefined' && Boolean(google?.script?.run);

export default isGASEnvironment;
