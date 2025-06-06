// server/checkMillionDollarIdea.js
const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
  
    const numWeeksNum = Number(numWeeks);
    const weeklyRevenueNum = Number(weeklyRevenue);
  
    // Validate that both are valid numbers
    if (
      isNaN(numWeeksNum) ||
      isNaN(weeklyRevenueNum) ||
      numWeeksNum <= 0 ||
      weeklyRevenueNum <= 0
    ) {
      return res.status(400).send('Invalid or missing numWeeks or weeklyRevenue');
    }
  
    const totalValue = numWeeksNum * weeklyRevenueNum;
  
    if (totalValue < 1000000) {
      return res.status(400).send('Idea is not worth at least one million dollars');
    }
  
    next();
  };
  
  module.exports = checkMillionDollarIdea;
  

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
