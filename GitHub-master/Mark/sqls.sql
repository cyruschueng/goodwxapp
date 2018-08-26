/*多表查询单个用户所有信息*/
SELECT  sum_rank.account,
		sum_rank.name,
		sum_rank.intelligence,
		intelligence_rank.rank as irank,
		sum_rank.sports,
		sports_rank.rank as srank,
		sum_rank.morality,
		morality_rank.rank as mrank,
		sum_rank.sum,
		sum_rank.rank
		
FROM  `sum_rank` 
JOIN  `sports_rank` ON sum_rank.account = sports_rank.snum
JOIN  `morality_rank` ON sum_rank.account = morality_rank.snum
JOIN  `intelligence_rank` ON sum_rank.account = intelligence_rank.snum
WHERE account =  '1108424001'


	var sql = 'SELECT sum_rank.account, sum_rank.name, sum_rank.intelligence, intelligence_rank.rank AS irank, sum_rank.sports , sports_rank.rank AS srank, sum_rank.morality, morality_rank.rank AS mrank, sum_rank.sum, sum_rank.rank FROM `sum_rank` JOIN `sports_rank` ON sum_rank.account = sports_rank.snum JOIN `morality_rank` ON sum_rank.account = morality_rank.snum JOIN `intelligence_rank` ON sum_rank.account = intelligence_rank.snum WHERE sum_rank.name ='+name;
