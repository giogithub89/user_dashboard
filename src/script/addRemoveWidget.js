export const addWidget = (widgetList, setWidgetList) => {
  return setWidgetList([...widgetList, { widget: "" }]);
};

export const removeWidget = (widgetList, index, setWidgetList) => {
  const list = [...widgetList];
  list.splice(index, 1);
  return setWidgetList(list);
};
