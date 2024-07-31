export function formatInvestmentRange(range: string): string {
  // Remove the "Rs." prefix and trim any whitespace
  const sanitizedRange = range.replace("Rs.", "").trim();

  // Split the range into min and max parts
  const [min, max] = sanitizedRange
    .split("-")
    .map((val) => parseFloat(val.replace(/,/g, "").trim()));

  if (isNaN(min) || isNaN(max)) {
    throw new Error("Invalid input range");
  }

  function formatValue(value: number): string {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(0) + "Cr";
    } else if (value >= 100000) {
      return (value / 100000).toFixed(0) + "L";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + "K";
    } else {
      return value.toString();
    }
  }

  return `Rs. ${formatValue(min)}-${formatValue(max)}`;
}
