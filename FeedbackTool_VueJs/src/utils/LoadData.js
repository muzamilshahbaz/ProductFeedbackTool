export async function loadData(dataArray, store, storeAction, message, vm, loadingStateName) {
    if (dataArray.length === 0) {
      try {
        vm[loadingStateName] = true;
        await store.dispatch(storeAction, {});
        vm[loadingStateName] = false;
      } catch (error) {
        vm[loadingStateName] = false;
        console.error(`Error fetching ${message} data`, error);
      }
    }
}

export async function noDataMessage(dataArray, message, vm, noDataMessageProperty) {
    const noDataMessage = `No ${message} data available`;
  
    if (dataArray.length === 0) {
        vm[noDataMessageProperty] = noDataMessage;

        setTimeout(() => {
            vm[noDataMessageProperty] = '';
        }, 3000);
    } else {
        vm[noDataMessageProperty] = '';
    }
}
  