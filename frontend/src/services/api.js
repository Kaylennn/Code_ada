async function request(path, options) {
  let response
  try {
    response = await fetch(path, options)
  } catch (error) {
    throw new Error(
      `Could not reach the server. Check that the Flask API is running, then retry. (${error.message})`,
      { cause: error },
    )
  }

  if (!response.ok) {
    let detail = await response.text()
    try {
      detail = JSON.parse(detail)?.error ?? detail
    } catch {
      // Keep non-JSON error bodies, such as proxy errors, readable.
    }
    throw new Error(detail || `Request failed with status ${response.status}.`)
  }

  try {
    return await response.json()
  } catch {
    throw new Error('The server returned an invalid response. Please retry.')
  }
}

async function getArray(path, label) {
  const data = await request(path)
  if (!Array.isArray(data)) {
    throw new Error(`The ${label} response was not a list. Please retry.`)
  }
  return data
}

export function getSightings() {
  return getArray('/api/sightings', 'sightings')
}

export function getPullsites() {
  return getArray('/api/pullsites', 'pull sites')
}

export async function postReport(report) {
  const result = await request('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report),
  })
  if (!Array.isArray(result?.sightings) || !Array.isArray(result?.pullsites)) {
    throw new Error('The report was not confirmed with updated data. Please retry.')
  }
  return result
}

export async function identifyPhoto(image) {
  const body = new FormData()
  body.append('image', image)
  const result = await request('/api/identify', { method: 'POST', body })
  if (!['possible_invasive', 'not_in_catalog', 'uncertain'].includes(result?.status)
    || !Array.isArray(result?.candidates)) {
    throw new Error('The identification response was incomplete. Please retry.')
  }
  return result
}

export async function postSignup(pullsiteId) {
  const result = await request('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pullsite_id: pullsiteId }),
  })
  if (!result?.pullsite || result.pullsite.id == null) {
    throw new Error('The signup was not confirmed by the server. Please retry.')
  }
  return result
}
