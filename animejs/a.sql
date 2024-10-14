select a.id,b.id bid,a.status from submissions a left outer join submission_details b on b.submission_id=a.id where budgeting_number in ("202410/BUD/00606","202410/BUD/00605")
update submission_details set status=6 where id in (2411,2412);
