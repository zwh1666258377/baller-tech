export function callTimesLimit(key: string) {
  const storageKey = `callTimesLimit_${key}`;
  function setCallTimesLimit(): number {
    const currentLimit = window.localStorage.getItem(storageKey);
    const currentLimitJson = JSON.parse(currentLimit || '{}') as Record<
      string,
      number
    >;
    const todayDate = new Date().toDateString();
    if (currentLimitJson?.[todayDate]) {
      currentLimitJson[todayDate] = currentLimitJson?.[todayDate] + 1;
    } else {
      currentLimitJson[todayDate] = 1;
    }
    localStorage.setItem(storageKey, JSON.stringify(currentLimitJson));

    return currentLimitJson[todayDate];
  }

  function checkCallTimesLimit(times: number): boolean {
    const currentLimit = window.localStorage.getItem(storageKey);
    const currentLimitJson = JSON.parse(currentLimit || '{}') as Record<
      string,
      number
    >;
    const todayDate = new Date().toDateString();
    if (currentLimitJson?.[todayDate] >= times) {
      return false;
    }

    return true;
  }

  return {
    setCallTimesLimit,
    checkCallTimesLimit,
  };
}
