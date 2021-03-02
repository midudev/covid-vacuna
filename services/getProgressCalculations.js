export const getPartialVacunationPopulation =
  ({ porcentajePoblacionAdministradas, porcentajePoblacionCompletas }) => {
    if (porcentajePoblacionAdministradas === null) return 0
    if (porcentajePoblacionCompletas === null) return porcentajePoblacionAdministradas
    return porcentajePoblacionAdministradas - porcentajePoblacionCompletas
  }

export const getCompleteVacunationPopulation = ({ porcentajePoblacionCompletas }) => {
  if (porcentajePoblacionCompletas === null) return 0
  return porcentajePoblacionCompletas
}
