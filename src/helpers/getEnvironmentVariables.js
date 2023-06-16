export const getEnvironmentVariables = () => {
  import.meta.env;
  return {
    ...import.meta.env
  };
};
