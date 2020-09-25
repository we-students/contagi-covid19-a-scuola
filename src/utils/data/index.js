let data;

export const updateData = async () =>
  await (
    await fetch(
      "https://spreadsheets.google.com/feeds/cells/111HISX9asdXADszmq0ppNvznRW_LFJyyCDcyfnPb87k/1/public/full?alt=json"
    )
  ).json();

export const getData = async () => {
  if (data) {
    return data;
  }
  return await updateData();
};

export const getList = async () => {
  const data = await getData();
  const { entries } = data;

  console.log(entries);

  return [];
};
