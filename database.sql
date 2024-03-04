CREATE TABLE Log (
    date TEXT PRIMARY KEY,
    workCarriedOut TEXT,
    knowledgeGained TEXT,
    competencies TEXT
);

INSERT INTO Log (Date, workCarriedOut, knowledgeGained, competencies) VALUES 
('2023-07-04', 'Setup my laptop and learned how to initialise the web server and vagrant.
Also got registered in the organisation with GitHub and Slack.', 'Setting up server environment, GitHub & Slack registration', ''),
('2023-07-05', 'Continued setup from yesterday. Added login and password for ib.admin.', 'Further system configuration for ib.admin, potential user credentials set up', ''),
('2023-07-07', 'Encountered Wifi issues at home, delayed start to work.', 'Identified Wi-Fi issues, understanding impact on work, potential troubleshooting', ''),
('2023-07-10', 'Productive day with significant progress.', 'Increased productivity, efficient task completion', ''),
('2023-07-11', 'Finished the issue from the 10th, set up with bright hr, and booked the first day off.', 'Issue resolution, HR process understanding, planned time off', ''),
('2023-07-12', 'Created a cheat sheet to troubleshoot issues or recover forgotten information.
Struggled with focus.', 'Proactive troubleshooting aid, coping with forgetfulness, focus challenges', ''),
('2023-07-13', 'Completed the tag popup issue, struggled with PHP.
Enjoyed frontend JS/CSS, aiming for PHP improvement.', 'Issue resolution, preference for frontend tasks, identified PHP skill gap', ''),
('2023-07-21', 'Discovered the possibility of working from home on Fridays.', 'Adjusting to commute disruptions, Remote work realization, improved office communication', ''),
('2023-07-25', 'More productive day after missing yesterday. Tried conventional commits in the latest PR.', 'Improved productivity, learning new coding practices', ''),
('2023-07-26', 'Enjoyable day, I learned about photography and PHP from colleagues.
Fixed mailing issue.', 'Shared interests, PHP learning, problem-solving with mailing issue', ''),
('2023-08-09', 'Spent the day on the Anonymous issue, feeling satisfied but unsure about the next task.
Issues in triage seem challenging.', 'Resolved issues, challenging problem recognition, feeling of uncertainty', ''),
('2023-08-10', 'Tackled the reapit issue and attended a house viewing, which was canceled without notification.', 'Issue resolution, adaptability to schedule changes, facing unexpected situations', ''),
('2023-08-21', 'First day back after being on holiday.', 'Return to work after time off, readjustment to work environment', ''),
('2023-10-11', 'Tackled a large amount of unit test failures.', 'Improved unit testing skills, troubleshooting and resolving test failures', 'Unit testing, Troubleshooting'),
('2023-11-08', 'Optimized inspection fetching in one of my PRs. Learned a more performant way to fetch bigger datasets.', 'PR optimization, Improved data fetching performance, knowledge of handling larger datasets', 'Coding optimization, Data handling'),
('2023-11-29', 'Had to rollback some accidental changes on a PR.', 'Learned a bit more on how git reset works, as well as revert commits (still more to learn on this)', ''),
('2024-01-05', 'Fixed a problem on one of my PRs with the state not updating when supposed to.', 'Learned about a new state management tool called Pusher that we use to help with state management when integrating with other sites', ''),
('2024-01-12', 'Fixed a monster of a merge conflict, that couldn’t be handled on GitHub.', 'Became more familiar with Git CLI, and how to fix merge conflicts manually', ''),
('2024-01-15', 'We converted the whole codebase from JavaScript to TypeScript.
Had to recreate some PRs.', 'Learned how migrating sweeping changes in codebases works (kinda)', ''),
('2024-01-22', 'Worked on Feat: Open Weather Integration.', 'Learned that any HTTP code above 400 is for errors', ''),
('2024-02-01', 'Created: Feat: FF to control late subscription alert, Feat: Test PR
Merged: Feat: FF to control late subscription alert', '', ''),
('2024-02-07', 'Created: Fix: Action filters default enabled, Fix: All actions ticked by default
Closed: Fix: All actions ticked by default', '', ''),
('2024-02-12', 'Created: Fix: Spacing discrepancy on share report modal', '', ''),
('2024-02-16', 'Worked on: Feat: Open Weather Integration', '', ''),
('2024-02-19', 'Worked on: Fix: Action filters default enabled
Merged: Fix: Action filters default enabled', '', ''),
('2024-02-20', 'Worked on: Feat: Visual password feedback on password forget screen, Feat: Custom field activities and create activities on update/create
Merged: Feat: Visual password feedback on password forget screen', '', ''),
('2024-02-21', 'Worked on: Feat: Custom field activities and create activities on update/create
Created: Fix: Report editor media dropzone width, Fix: URPN fixes and improvements, Fix: Additional email sending on inspection close', 'Improved my CSS, PHP/Laravel, Redux, PHP, PHPUnit, Typescript, PHPSpec, and Laravel skills', ''),
('2024-02-22', 'Worked on: Fix: URPN fixes and improvements, Fix: Additional email sending on inspection close, Feat: Custom field activities and create activities on update/create, Fix: Report editor media dropzone width
Merged: Fix: URPN fixes and improvements, Feat: Custom field activities and create activities on update/create, Fix: Report editor media dropzone width', 'Worked on my PHP/Laravel, Redux, PHP, PHPUnit, Typescript, PHPSpec, Laravel, and CSS skills', ''),
('2024-02-26', 'Worked on: Feat: EPC rating tweaks, Fix: Additional email sending on inspection close
Created: Fix: Invalid CSV loader stuck
Merged: Fix: Additional email sending on inspection close', 'Worked on my Laravel, TS, PHP, and PHPUnit skills', ''),
('2024-02-28', 'Worked on: Fix: Invalid CSV loader stuck, Fix: Additional email sending on inspection close', 'Worked on my TS, PHP, and PHPUnit skills', ''),
('2024-02-29', 'Worked on: Feat: Open Weather Integration
Merged: Feat: Open Weather Integration', 'Worked on my  skills', '');
