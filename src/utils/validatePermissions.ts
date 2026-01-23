export const ValidateRights = (
  requiredRights: string[],
  userRights: string[],
): boolean => {
  // console.log("Required Rights: ", requiredRights);
  // console.log("User Rights: ", userRights);

  const hasWildcard = userRights.includes("*") || userRights.includes("*:*");
  const canPass =
    hasWildcard ||
    requiredRights.every((requiredRight) => userRights.includes(requiredRight));

  // console.log("Can Pass: ", canPass);
  return canPass;
};
