import getBlockConfigsList from '../configs/getBlockConfigsList';
import getColumnConfigFunc from '../configs/getColumnConfigFunc';
import getColumnsSettings from '../configs/getColumnsSettings';

const useDataSource = () => {
  const blockConfigsList = getBlockConfigsList();
  const columnsSetting = getColumnsSettings();
  const getColumnConfig = getColumnConfigFunc();

  return {
    blockConfigsList,
    columnsSetting,
    getColumnConfig,
  };
};

export default useDataSource;
