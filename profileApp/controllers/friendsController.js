const addFriend = async (user_id1, user_id2) => {
  await friends.create({ user_id1, user_id2 });
};
