import axios from 'axios'

// const BASE_URL = 'http://127.0.0.1:8000'
const BASE_URL = 'http://192.168.1.122:1080'

const config = async () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: localStorage.getItem('session'),
    },
    withCredentials: true,
  }
}

export const login = async (email) => {
  const res = await axios.post(
    `${BASE_URL}/login`,
    {
      email,
    },
    {
      ...(await config()),
    },
  )
  localStorage.setItem('session', res.data.email)
  return res
}

export const getMeetingList = async () => {
  return axios.get(`${BASE_URL}/poll`, {
    ...(await config()),
  })
}

export const getMyMeetingsList = getMeetingList

export const getMeeting = async (meetingId) => {
  console.log('meetingId: ', meetingId)
  return axios.get(`${BASE_URL}/poll/${meetingId}`, {
    ...(await config()),
  })
}

export const getAvailableRooms = async (startDate, endDate) => {
  return axios.get(
    `${BASE_URL}/room/available?start=${startDate.substr(0, startDate.length - 1)}&end=${endDate.substr(
      0,
      endDate.length - 1,
    )}`,
    {
      ...(await config()),
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
      ...(await config()),
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
      ...(await config()),
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
        ...(await config()),
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
        ...(await config()),
      },
    )
  }
}

export const getPollsList = async () => {
  // TODO:
  return axios.get(`${BASE_URL}/poll/my`, {
    ...(await config()),
  })
}

export const getPoll = async (poll_id) => {
  return axios.get(`${BASE_URL}/poll/${poll_id}`, {
    ...(await config()),
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
      ...(await config()),
    },
  )
}

export const getPollComments = async (poll_id) => {
  return axios.get(`${BASE_URL}/poll/${poll_id}/comments`, {
    ...(await config()),
  })
}

export const createComment = async (poll_id, newComment) => {
  return axios.post(
    `${BASE_URL}/comment/`,
    {
      poll: poll_id,
      text: newComment,
      writer: 1, // TODO: get from context!
    },
    {
      ...(await config()),
    },
  )
}
