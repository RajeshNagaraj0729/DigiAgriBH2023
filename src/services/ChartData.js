// React Imports
import dateFormat from "dateformat";

/**
 * dataset for chat data
 * @param {string} labels
 * @param {array} xAxesData
 * @param {array} yAxesData
 */
const Data = (labels, xAxesData, yAxesData) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "Disease Detected",
        data: xAxesData,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Disease Undetected",
        data: yAxesData,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };
};

/**
 * get dates depending on number
 * @param {integer} num
 */
const Dates = (num) => {
  var dates = [...Array(num).keys()];
  dates = dates.reverse();
  dates = dates.map((r) =>
    dateFormat(Date.now() - r * 24 * 60 * 60 * 1000, "dd/mm/yyyy")
  );
  return dates;
};

/**
 * getting data depending on number of days
 * @param {Object} props
 */
export const weeklyData = (props) => {
  // Getting dates
  var dates = Dates(props.num);

  //Getting unique dates from props
  const uniqueDates = props.data
    .filter(
      (arr1, i, arr) => arr.findIndex((t) => t.id.date === arr1.id.date) === i
    )
    .map((row) => row.id.date)
    .sort();

  // Getting without Disease data
  let withoutDisease = props.data.filter(
    (row) => row.id.diagnosisDetails === null
  );

  // Getting with disease data
  let withDisease = props.data.filter((row) => row.id.diagnosisDetails != null);
  withDisease = uniqueDates
    .map((row) => {
      const array = withDisease.map((r) => {
        if (r.id.date === row) return Number(r.count);
        else return 0;
      });
      return {
        date: row,
        count: array,
      };
    })
    .map((row) => {
      return {
        date: row.date,
        count: row.count.reduce((a, b) => a + b, 0),
      };
    });
  const xAxesData = dates.map((row) => {
    const num = withDisease.filter(
      (r) => row === dateFormat(r.date, "dd/mm/yyyy")
    );
    if (num.length !== 0) {
      return num[0].count;
    } else return 0;
  });
  const yAxesData = dates.map((row) => {
    const num = withoutDisease.filter(
      (r) => row === dateFormat(r.id.date, "dd/mm/yyyy")
    );
    if (num.length !== 0) {
      return num[0].count;
    } else return 0;
  });
  const data = Data(dates, xAxesData, yAxesData);
  return data;
};
