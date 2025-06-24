export function useAuth() {
  // Application sans authentification - tous les utilisateurs sont considérés comme "connectés"
  return {
    user: { id: 'anonymous', name: 'Utilisateur' },
    isLoading: false,
    isAuthenticated: true,
  };
}
