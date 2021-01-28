/* global fetch */

const { GITHUB_TOKEN } = process.env
const GITHUB_API_ENDPOINT = 'https://api.github.com/repos/midudev/covid-vacuna/contributors'
const headers = {
  Authorization: `token ${GITHUB_TOKEN}`
}

const MAPPED_USERS = {
  btisjelo: {
    login: 'jelowin',
    avatar: 'https://avatars.githubusercontent.com/u/74491547?s=460&u=1d3c591dea8d2ace4eaba0afa3af78450e1d876a&v=4',
    url: 'https://github.com/jelowin'
  }
}

function mapFromApiResponseToContributors (apiResponse) {
  return apiResponse.map(
    ({ login, avatar_url: avatar, html_url: url }) => {
      return MAPPED_USERS[login] || ({ login, avatar, url })
    }
  )
}

export default async function getGitHubContributors () {
  const apiResponse = await fetch(GITHUB_API_ENDPOINT, { headers })
    .then(res => res.ok ? res.json() : [])
    .catch(() => [])

  return mapFromApiResponseToContributors(apiResponse)
}
