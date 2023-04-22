import statusCallback from '../twilio/callback';

const doPost: DoPostWrapper.DoPost = (e) => statusCallback(e);

export default doPost;
