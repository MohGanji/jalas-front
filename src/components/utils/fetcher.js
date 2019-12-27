import axios from 'axios'

// const BASE_URL = 'http://127.0.0.1:8000'
const BASE_URL = 'http://192.168.1.122:1080'

const headers = async () => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
}

export const getMeetingList = async () => {
  return axios.get(`${BASE_URL}/poll`, {
    headers: await headers(),
  })
}

export const getMyMeetingsList = getMeetingList

export const getMeeting = async (meetingId) => {
  console.log('meetingId: ', meetingId)
  return axios.get(`${BASE_URL}/poll/${meetingId}`, {
    headers: await headers(),
  })
}

export const getAvailableRooms = async (startDate, endDate) => {
  return axios.get(
    `${BASE_URL}/room/available?start=${startDate.substr(0, startDate.length - 1)}&end=${endDate.substr(
      0,
      endDate.length - 1,
    )}`,
    {
      headers: await headers(),
    },
  )
}

export const reserveRoom = async (poll_id, room_number) => {
  console.log('TCL: reserveRoom -> poll_id, room_number', poll_id, room_number)
  return axios.post(
    `${BASE_URL}/poll/${poll_id}/finalize`,
    {
      poll_id,
      room_number,
    },
    {
      headers: await headers(),
    },
  )
}

export const cancelMeetingReservation = async (meeting_id) => {
  return axios.post(
    `${BASE_URL}/room/cancel_meeting`,
    {
      meeting_id,
    },
    {
      headers: await headers(),
    },
  )
}

export const createOrUpdatePoll = async (poll) => {
  // TODO:
  console.log('createOrUpdatePoll: ', poll)
  if (poll.poll_id) {
    return axios.put(
      `${BASE_URL}/poll/${poll.poll_id}`,
      {
        title: poll.title,
        options_set: poll.options,
        attendees: poll.guests,
      },
      {
        headers: await headers(),
      },
    )
  } else {
    return axios.post(
      `${BASE_URL}/poll`,
      {
        title: poll.title,
        options_set: poll.options,
        attendees: poll.guests,
      },
      {
        headers: await headers(),
      },
    )
  }
}

export const getPollsList = async () => {
  // TODO:
  return axios.get(`${BASE_URL}/poll/my`, {
    headers: await headers(),
  })
}

export const getPoll = async (poll_id) => {
  return axios.get(`${BASE_URL}/poll/${poll_id}`, {
    headers: await headers(),
  })
}

export const createVote = async (user_email, option_id, vote) => {
  return axios.post(
    `${BASE_URL}/vote`,
    {
      person_email: user_email,
      option_id,
    },
    {
      headers: await headers(),
    },
  )
}

export const getPollComments = async (poll_id) => {
  // TODO:
  return axios.get(
    `${BASE_URL}/comments`,
    {
      poll_id: poll_id,
    },
    {
      headers: await headers(),
    },
  )
}

export const createComment = async (poll_id, newComment) => {
  // TODO:
  return axios.post(
    `${BASE_URL}/comments`,
    {
      poll_id: poll_id,
      newComment,
    },
    {
      headers: await headers(),
    },
  )
}
