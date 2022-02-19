function relativeUrl(relative: string): URL {
    return new URL(relative, window.location.origin);
}

export const ApiConstants = {
    getTournaments(search?: string): URL {
        const url = relativeUrl('/tournaments');
        if (search) {
            const searchParams = new URLSearchParams();
            searchParams.append('q', search);
            url.search = searchParams.toString();
        }
        return url;
    },

    getTournament(tournamentId: string): URL {
        return relativeUrl(`/tournaments/${tournamentId}`);
    },
};
