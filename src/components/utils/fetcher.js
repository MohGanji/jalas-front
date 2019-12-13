import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const headers = async () => {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
};

export const getMeetingList = async () => {
  return axios.get(`${BASE_URL}/meeting`, {
    headers: await headers()
  });
};

export const getMeeting = async meetingId => {
  console.log("meetingId: ", meetingId);
  return axios.get(`${BASE_URL}/meeting/${meetingId}`, {
    headers: await headers()
  });
};

export const getAvailableRooms = async (startDate, endDate) => {
  return axios.get(
    `${BASE_URL}/room/available?start=${startDate.substr(
      0,
      startDate.length - 1
    )}&end=${endDate.substr(0, endDate.length - 1)}`,
    {
      headers: await headers()
    }
  );
};

export const reserveRoom = async (poll_id, room_number) => {
  console.log("TCL: reserveRoom -> poll_id, room_number", poll_id, room_number);
  return axios.post(
    `${BASE_URL}/poll/${poll_id}/finalize`,
    {
      poll_id,
      room_number
    },
    {
      headers: await headers()
    }
  );
};

export const cancelMeetingReservation = async meeting_id => {
  return axios.post(
    `${BASE_URL}/room/cancel_meeting`,
    {
      meeting_id
    },
    {
      headers: await headers()
    }
  );
};

export const createPoll = async poll => {
  return axios.post(
    `${BASE_URL}/poll`,
    {
      title: poll.title,
      options_set: poll.options,
      guests: poll.guests
    },
    {
      headers: await headers()
    }
  );
};

export const updatePoll = async poll => {
  return axios.post(
    `${BASE_URL}/poll/${poll.poll_id}`,
    {
      title: poll.title,
      options_set: poll.options,
      guests: poll.guests
    },
    {
      headers: await headers()
    }
  );
};

export const getPoll = async poll_id => {
  return axios.get(`${BASE_URL}/poll/${poll_id}`, {
    headers: await headers()
  });
};

export const createVote = async (user_email, option_id, vote) => {
  return axios.post(
    `${BASE_URL}/vote`,
    {
      user_email,
      option_id,
      vote: vote,
    },
    {
      headers: await headers()
    }
  );
};
