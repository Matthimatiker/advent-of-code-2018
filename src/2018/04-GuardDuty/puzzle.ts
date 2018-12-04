import {GuardEvent, GuardProfile, GuardShift} from "./GuardDuty";

const puzzleInput = "[1518-05-11 00:47] wakes up\n" +
    "[1518-07-13 00:59] wakes up\n" +
    "[1518-06-16 00:49] falls asleep\n" +
    "[1518-08-17 00:01] Guard #3529 begins shift\n" +
    "[1518-07-07 00:21] falls asleep\n" +
    "[1518-03-28 23:56] Guard #1069 begins shift\n" +
    "[1518-08-03 00:04] Guard #3137 begins shift\n" +
    "[1518-04-21 00:56] wakes up\n" +
    "[1518-07-20 00:10] wakes up\n" +
    "[1518-11-17 00:04] Guard #1747 begins shift\n" +
    "[1518-07-14 00:00] Guard #829 begins shift\n" +
    "[1518-03-11 00:56] wakes up\n" +
    "[1518-11-16 00:22] falls asleep\n" +
    "[1518-07-15 00:56] falls asleep\n" +
    "[1518-03-18 00:22] wakes up\n" +
    "[1518-04-26 00:41] wakes up\n" +
    "[1518-04-05 23:59] Guard #2287 begins shift\n" +
    "[1518-06-20 00:20] falls asleep\n" +
    "[1518-08-10 00:55] wakes up\n" +
    "[1518-10-28 00:59] wakes up\n" +
    "[1518-09-09 00:27] falls asleep\n" +
    "[1518-05-17 00:42] wakes up\n" +
    "[1518-09-05 00:10] falls asleep\n" +
    "[1518-06-27 00:24] wakes up\n" +
    "[1518-10-03 00:01] Guard #3137 begins shift\n" +
    "[1518-09-21 00:40] wakes up\n" +
    "[1518-03-08 00:22] falls asleep\n" +
    "[1518-11-21 00:59] wakes up\n" +
    "[1518-02-19 00:39] wakes up\n" +
    "[1518-02-17 00:18] wakes up\n" +
    "[1518-06-24 00:54] falls asleep\n" +
    "[1518-09-21 00:04] Guard #2381 begins shift\n" +
    "[1518-10-13 00:03] Guard #2063 begins shift\n" +
    "[1518-04-18 00:23] falls asleep\n" +
    "[1518-07-28 00:25] falls asleep\n" +
    "[1518-06-15 00:29] falls asleep\n" +
    "[1518-08-20 00:42] wakes up\n" +
    "[1518-04-11 00:02] Guard #3119 begins shift\n" +
    "[1518-03-20 00:59] wakes up\n" +
    "[1518-08-31 00:12] wakes up\n" +
    "[1518-05-19 23:57] Guard #2287 begins shift\n" +
    "[1518-05-15 00:36] wakes up\n" +
    "[1518-04-21 00:36] falls asleep\n" +
    "[1518-09-11 00:34] falls asleep\n" +
    "[1518-05-08 00:30] falls asleep\n" +
    "[1518-10-01 00:48] falls asleep\n" +
    "[1518-03-14 00:56] falls asleep\n" +
    "[1518-09-29 23:57] Guard #3119 begins shift\n" +
    "[1518-03-03 00:43] wakes up\n" +
    "[1518-10-29 00:34] falls asleep\n" +
    "[1518-10-19 00:54] wakes up\n" +
    "[1518-05-09 23:56] Guard #337 begins shift\n" +
    "[1518-05-10 00:09] falls asleep\n" +
    "[1518-11-02 00:32] wakes up\n" +
    "[1518-11-22 00:55] falls asleep\n" +
    "[1518-05-02 23:57] Guard #3571 begins shift\n" +
    "[1518-05-13 00:38] falls asleep\n" +
    "[1518-03-17 00:04] Guard #1907 begins shift\n" +
    "[1518-03-24 00:38] falls asleep\n" +
    "[1518-03-25 00:51] falls asleep\n" +
    "[1518-08-27 00:52] wakes up\n" +
    "[1518-08-11 00:03] Guard #337 begins shift\n" +
    "[1518-11-09 00:04] falls asleep\n" +
    "[1518-08-12 00:06] falls asleep\n" +
    "[1518-04-13 00:01] Guard #3529 begins shift\n" +
    "[1518-09-01 00:27] falls asleep\n" +
    "[1518-10-02 00:56] falls asleep\n" +
    "[1518-05-10 00:32] falls asleep\n" +
    "[1518-09-05 00:54] wakes up\n" +
    "[1518-03-22 23:58] Guard #2593 begins shift\n" +
    "[1518-07-26 00:53] falls asleep\n" +
    "[1518-09-25 23:59] Guard #1069 begins shift\n" +
    "[1518-07-13 00:36] falls asleep\n" +
    "[1518-05-28 00:51] falls asleep\n" +
    "[1518-07-21 00:23] falls asleep\n" +
    "[1518-07-06 00:31] falls asleep\n" +
    "[1518-08-26 00:00] Guard #829 begins shift\n" +
    "[1518-07-29 00:02] Guard #2593 begins shift\n" +
    "[1518-11-22 00:24] wakes up\n" +
    "[1518-04-30 00:07] falls asleep\n" +
    "[1518-07-01 00:52] wakes up\n" +
    "[1518-03-15 00:28] falls asleep\n" +
    "[1518-09-10 00:00] Guard #3571 begins shift\n" +
    "[1518-06-03 00:16] falls asleep\n" +
    "[1518-11-05 00:45] wakes up\n" +
    "[1518-07-03 23:59] Guard #827 begins shift\n" +
    "[1518-02-12 00:52] wakes up\n" +
    "[1518-08-30 00:10] falls asleep\n" +
    "[1518-09-01 00:41] wakes up\n" +
    "[1518-07-08 00:59] wakes up\n" +
    "[1518-03-17 00:59] wakes up\n" +
    "[1518-03-18 00:14] falls asleep\n" +
    "[1518-11-12 00:03] falls asleep\n" +
    "[1518-04-01 00:38] wakes up\n" +
    "[1518-05-01 23:57] Guard #2143 begins shift\n" +
    "[1518-10-26 00:15] falls asleep\n" +
    "[1518-07-25 00:54] falls asleep\n" +
    "[1518-03-29 00:57] wakes up\n" +
    "[1518-03-02 00:51] wakes up\n" +
    "[1518-03-23 23:50] Guard #3137 begins shift\n" +
    "[1518-08-28 00:35] falls asleep\n" +
    "[1518-03-24 00:53] wakes up\n" +
    "[1518-07-08 00:40] wakes up\n" +
    "[1518-02-17 23:57] Guard #3449 begins shift\n" +
    "[1518-04-12 00:51] falls asleep\n" +
    "[1518-08-13 00:58] wakes up\n" +
    "[1518-03-04 00:58] wakes up\n" +
    "[1518-03-05 00:56] wakes up\n" +
    "[1518-08-30 00:03] Guard #2063 begins shift\n" +
    "[1518-04-27 00:44] wakes up\n" +
    "[1518-04-04 00:24] wakes up\n" +
    "[1518-03-07 00:48] wakes up\n" +
    "[1518-05-29 23:46] Guard #2593 begins shift\n" +
    "[1518-09-13 00:00] Guard #829 begins shift\n" +
    "[1518-10-26 00:42] falls asleep\n" +
    "[1518-09-20 00:55] wakes up\n" +
    "[1518-10-07 23:49] Guard #2143 begins shift\n" +
    "[1518-08-18 00:26] falls asleep\n" +
    "[1518-04-12 00:46] wakes up\n" +
    "[1518-08-03 00:57] wakes up\n" +
    "[1518-08-20 00:52] falls asleep\n" +
    "[1518-03-02 00:06] falls asleep\n" +
    "[1518-09-19 00:08] falls asleep\n" +
    "[1518-09-08 00:46] wakes up\n" +
    "[1518-07-03 00:54] wakes up\n" +
    "[1518-09-19 00:41] wakes up\n" +
    "[1518-04-17 23:56] Guard #347 begins shift\n" +
    "[1518-03-02 00:58] wakes up\n" +
    "[1518-05-30 00:02] falls asleep\n" +
    "[1518-06-13 23:58] Guard #2593 begins shift\n" +
    "[1518-03-16 00:00] falls asleep\n" +
    "[1518-06-16 00:00] Guard #3449 begins shift\n" +
    "[1518-05-01 00:39] wakes up\n" +
    "[1518-05-27 00:45] wakes up\n" +
    "[1518-07-06 00:51] wakes up\n" +
    "[1518-10-01 00:58] wakes up\n" +
    "[1518-07-08 00:20] falls asleep\n" +
    "[1518-09-21 00:38] falls asleep\n" +
    "[1518-06-14 00:16] falls asleep\n" +
    "[1518-05-05 00:11] wakes up\n" +
    "[1518-08-04 00:18] wakes up\n" +
    "[1518-11-18 00:02] Guard #337 begins shift\n" +
    "[1518-06-11 00:13] falls asleep\n" +
    "[1518-02-24 00:15] falls asleep\n" +
    "[1518-10-23 00:28] falls asleep\n" +
    "[1518-07-05 23:57] Guard #829 begins shift\n" +
    "[1518-03-26 00:56] wakes up\n" +
    "[1518-02-23 00:45] wakes up\n" +
    "[1518-11-06 00:08] falls asleep\n" +
    "[1518-04-16 23:58] Guard #337 begins shift\n" +
    "[1518-09-09 00:35] wakes up\n" +
    "[1518-03-09 00:02] falls asleep\n" +
    "[1518-08-29 00:40] falls asleep\n" +
    "[1518-02-14 00:01] Guard #3119 begins shift\n" +
    "[1518-06-17 23:56] Guard #347 begins shift\n" +
    "[1518-08-06 00:37] falls asleep\n" +
    "[1518-09-20 00:45] falls asleep\n" +
    "[1518-11-10 00:51] wakes up\n" +
    "[1518-03-27 00:30] falls asleep\n" +
    "[1518-04-14 00:54] wakes up\n" +
    "[1518-03-23 00:38] falls asleep\n" +
    "[1518-03-17 00:46] falls asleep\n" +
    "[1518-07-23 00:43] wakes up\n" +
    "[1518-06-27 00:06] falls asleep\n" +
    "[1518-07-05 00:11] wakes up\n" +
    "[1518-06-10 00:59] wakes up\n" +
    "[1518-10-01 23:59] Guard #827 begins shift\n" +
    "[1518-08-24 00:33] wakes up\n" +
    "[1518-04-30 00:33] falls asleep\n" +
    "[1518-08-31 23:58] Guard #1759 begins shift\n" +
    "[1518-09-07 00:48] falls asleep\n" +
    "[1518-02-11 00:59] wakes up\n" +
    "[1518-06-29 00:55] falls asleep\n" +
    "[1518-05-08 00:12] wakes up\n" +
    "[1518-11-22 00:58] wakes up\n" +
    "[1518-08-25 00:54] wakes up\n" +
    "[1518-07-10 00:23] falls asleep\n" +
    "[1518-10-14 23:53] Guard #3361 begins shift\n" +
    "[1518-03-28 00:41] wakes up\n" +
    "[1518-08-16 00:45] falls asleep\n" +
    "[1518-06-07 00:06] falls asleep\n" +
    "[1518-09-06 00:57] wakes up\n" +
    "[1518-07-03 00:00] Guard #1163 begins shift\n" +
    "[1518-11-08 00:48] falls asleep\n" +
    "[1518-09-23 00:50] falls asleep\n" +
    "[1518-02-24 00:55] wakes up\n" +
    "[1518-04-22 00:53] wakes up\n" +
    "[1518-03-12 23:56] Guard #3571 begins shift\n" +
    "[1518-08-21 00:55] falls asleep\n" +
    "[1518-11-18 00:57] wakes up\n" +
    "[1518-05-24 23:56] Guard #1759 begins shift\n" +
    "[1518-10-17 00:53] wakes up\n" +
    "[1518-05-26 00:02] Guard #1163 begins shift\n" +
    "[1518-08-24 00:31] falls asleep\n" +
    "[1518-05-06 00:49] wakes up\n" +
    "[1518-09-10 00:56] falls asleep\n" +
    "[1518-10-24 00:38] falls asleep\n" +
    "[1518-05-30 23:49] Guard #2969 begins shift\n" +
    "[1518-06-25 00:41] wakes up\n" +
    "[1518-06-21 00:00] Guard #2143 begins shift\n" +
    "[1518-11-14 00:42] falls asleep\n" +
    "[1518-06-01 00:26] falls asleep\n" +
    "[1518-10-03 00:35] falls asleep\n" +
    "[1518-03-10 00:37] wakes up\n" +
    "[1518-11-03 00:14] falls asleep\n" +
    "[1518-07-27 00:03] Guard #3119 begins shift\n" +
    "[1518-11-21 00:48] wakes up\n" +
    "[1518-09-08 00:23] falls asleep\n" +
    "[1518-07-14 00:24] falls asleep\n" +
    "[1518-07-12 23:57] Guard #1759 begins shift\n" +
    "[1518-03-11 00:45] wakes up\n" +
    "[1518-07-11 23:56] Guard #3361 begins shift\n" +
    "[1518-11-04 00:03] Guard #353 begins shift\n" +
    "[1518-03-11 00:04] Guard #2143 begins shift\n" +
    "[1518-10-14 00:26] wakes up\n" +
    "[1518-08-10 00:00] Guard #829 begins shift\n" +
    "[1518-03-02 00:45] falls asleep\n" +
    "[1518-09-17 00:40] wakes up\n" +
    "[1518-09-04 00:02] Guard #3361 begins shift\n" +
    "[1518-04-03 00:55] wakes up\n" +
    "[1518-04-07 00:47] falls asleep\n" +
    "[1518-04-23 00:54] wakes up\n" +
    "[1518-11-20 00:00] Guard #3571 begins shift\n" +
    "[1518-05-31 00:44] wakes up\n" +
    "[1518-08-29 00:11] falls asleep\n" +
    "[1518-06-10 00:33] falls asleep\n" +
    "[1518-07-16 00:44] falls asleep\n" +
    "[1518-03-16 00:55] wakes up\n" +
    "[1518-04-04 00:30] falls asleep\n" +
    "[1518-09-17 00:01] Guard #337 begins shift\n" +
    "[1518-03-02 00:26] wakes up\n" +
    "[1518-02-23 00:57] wakes up\n" +
    "[1518-07-24 00:53] falls asleep\n" +
    "[1518-04-15 00:00] Guard #827 begins shift\n" +
    "[1518-10-02 00:42] wakes up\n" +
    "[1518-08-27 23:57] Guard #3571 begins shift\n" +
    "[1518-05-03 00:40] wakes up\n" +
    "[1518-09-10 00:57] wakes up\n" +
    "[1518-11-11 00:19] falls asleep\n" +
    "[1518-10-10 00:01] Guard #1747 begins shift\n" +
    "[1518-03-07 00:44] falls asleep\n" +
    "[1518-09-24 00:04] Guard #2287 begins shift\n" +
    "[1518-06-09 00:04] Guard #2593 begins shift\n" +
    "[1518-04-04 00:39] wakes up\n" +
    "[1518-09-18 00:38] falls asleep\n" +
    "[1518-04-01 00:00] Guard #2593 begins shift\n" +
    "[1518-05-23 00:48] falls asleep\n" +
    "[1518-06-28 00:37] wakes up\n" +
    "[1518-05-22 00:08] falls asleep\n" +
    "[1518-11-13 00:31] falls asleep\n" +
    "[1518-09-19 00:44] falls asleep\n" +
    "[1518-06-06 00:57] wakes up\n" +
    "[1518-05-18 00:57] wakes up\n" +
    "[1518-02-19 00:28] falls asleep\n" +
    "[1518-07-02 00:39] wakes up\n" +
    "[1518-05-09 00:33] falls asleep\n" +
    "[1518-04-09 23:59] Guard #1747 begins shift\n" +
    "[1518-02-17 00:12] falls asleep\n" +
    "[1518-05-29 00:33] falls asleep\n" +
    "[1518-11-23 00:05] falls asleep\n" +
    "[1518-08-27 00:23] falls asleep\n" +
    "[1518-07-19 00:29] falls asleep\n" +
    "[1518-09-17 00:19] falls asleep\n" +
    "[1518-04-06 00:41] wakes up\n" +
    "[1518-05-10 00:10] wakes up\n" +
    "[1518-05-03 00:27] wakes up\n" +
    "[1518-11-21 00:46] falls asleep\n" +
    "[1518-10-08 00:00] falls asleep\n" +
    "[1518-03-14 00:02] falls asleep\n" +
    "[1518-06-29 00:20] falls asleep\n" +
    "[1518-10-09 00:35] wakes up\n" +
    "[1518-09-22 00:03] falls asleep\n" +
    "[1518-04-02 00:09] wakes up\n" +
    "[1518-08-24 00:00] Guard #1747 begins shift\n" +
    "[1518-10-26 00:34] falls asleep\n" +
    "[1518-05-03 23:56] Guard #3449 begins shift\n" +
    "[1518-04-15 00:40] falls asleep\n" +
    "[1518-09-09 00:39] falls asleep\n" +
    "[1518-10-30 00:02] Guard #1069 begins shift\n" +
    "[1518-09-18 00:44] falls asleep\n" +
    "[1518-11-22 23:47] Guard #2969 begins shift\n" +
    "[1518-03-03 00:54] falls asleep\n" +
    "[1518-06-19 00:47] wakes up\n" +
    "[1518-04-25 00:01] Guard #2287 begins shift\n" +
    "[1518-08-25 00:27] falls asleep\n" +
    "[1518-07-04 00:43] falls asleep\n" +
    "[1518-11-08 00:27] falls asleep\n" +
    "[1518-11-21 00:51] falls asleep\n" +
    "[1518-03-02 00:56] falls asleep\n" +
    "[1518-08-04 00:00] falls asleep\n" +
    "[1518-03-13 23:48] Guard #353 begins shift\n" +
    "[1518-03-20 00:44] wakes up\n" +
    "[1518-04-15 00:47] falls asleep\n" +
    "[1518-06-29 00:52] wakes up\n" +
    "[1518-03-28 00:01] Guard #2593 begins shift\n" +
    "[1518-09-06 00:52] falls asleep\n" +
    "[1518-05-26 00:46] falls asleep\n" +
    "[1518-08-21 00:00] falls asleep\n" +
    "[1518-10-07 00:46] falls asleep\n" +
    "[1518-04-09 00:41] falls asleep\n" +
    "[1518-05-18 23:47] Guard #2287 begins shift\n" +
    "[1518-05-04 00:50] wakes up\n" +
    "[1518-08-10 00:37] falls asleep\n" +
    "[1518-07-01 00:32] falls asleep\n" +
    "[1518-03-21 00:57] wakes up\n" +
    "[1518-06-06 23:57] Guard #2593 begins shift\n" +
    "[1518-06-29 00:56] wakes up\n" +
    "[1518-04-15 00:44] wakes up\n" +
    "[1518-09-11 00:37] wakes up\n" +
    "[1518-07-25 00:56] wakes up\n" +
    "[1518-04-23 00:00] Guard #2593 begins shift\n" +
    "[1518-07-24 00:00] Guard #2593 begins shift\n" +
    "[1518-08-31 00:00] falls asleep\n" +
    "[1518-10-26 00:22] wakes up\n" +
    "[1518-05-01 00:30] falls asleep\n" +
    "[1518-02-13 00:38] falls asleep\n" +
    "[1518-03-05 00:37] wakes up\n" +
    "[1518-10-18 23:57] Guard #829 begins shift\n" +
    "[1518-10-24 00:55] wakes up\n" +
    "[1518-02-20 00:58] wakes up\n" +
    "[1518-11-06 00:01] Guard #3361 begins shift\n" +
    "[1518-06-28 00:20] falls asleep\n" +
    "[1518-02-27 23:57] Guard #1163 begins shift\n" +
    "[1518-10-26 00:00] Guard #1907 begins shift\n" +
    "[1518-09-22 00:36] wakes up\n" +
    "[1518-05-24 00:46] wakes up\n" +
    "[1518-06-13 00:46] falls asleep\n" +
    "[1518-05-23 23:47] Guard #3361 begins shift\n" +
    "[1518-03-18 00:54] falls asleep\n" +
    "[1518-09-16 00:43] falls asleep\n" +
    "[1518-09-24 00:49] wakes up\n" +
    "[1518-06-14 00:35] falls asleep\n" +
    "[1518-02-18 00:59] wakes up\n" +
    "[1518-08-26 23:57] Guard #353 begins shift\n" +
    "[1518-11-11 23:51] Guard #1759 begins shift\n" +
    "[1518-09-18 00:49] wakes up\n" +
    "[1518-10-02 00:51] wakes up\n" +
    "[1518-10-27 23:57] Guard #1759 begins shift\n" +
    "[1518-11-09 00:54] wakes up\n" +
    "[1518-07-29 00:40] falls asleep\n" +
    "[1518-03-18 00:46] wakes up\n" +
    "[1518-11-03 00:02] Guard #2063 begins shift\n" +
    "[1518-08-18 00:00] falls asleep\n" +
    "[1518-10-18 00:04] Guard #2287 begins shift\n" +
    "[1518-09-29 00:31] falls asleep\n" +
    "[1518-11-06 00:29] falls asleep\n" +
    "[1518-05-20 23:57] Guard #3571 begins shift\n" +
    "[1518-10-14 00:59] wakes up\n" +
    "[1518-06-24 00:24] falls asleep\n" +
    "[1518-02-15 23:48] Guard #1907 begins shift\n" +
    "[1518-06-03 00:34] falls asleep\n" +
    "[1518-09-29 00:01] Guard #337 begins shift\n" +
    "[1518-06-30 00:55] wakes up\n" +
    "[1518-09-01 00:57] wakes up\n" +
    "[1518-04-05 00:55] wakes up\n" +
    "[1518-06-30 00:04] falls asleep\n" +
    "[1518-04-29 00:57] wakes up\n" +
    "[1518-06-21 00:59] wakes up\n" +
    "[1518-03-26 23:59] Guard #3449 begins shift\n" +
    "[1518-05-27 00:33] falls asleep\n" +
    "[1518-11-18 23:52] Guard #2287 begins shift\n" +
    "[1518-04-28 00:46] wakes up\n" +
    "[1518-08-20 00:53] wakes up\n" +
    "[1518-08-22 00:56] wakes up\n" +
    "[1518-09-06 00:05] falls asleep\n" +
    "[1518-10-29 00:56] falls asleep\n" +
    "[1518-09-25 00:52] falls asleep\n" +
    "[1518-06-22 00:19] falls asleep\n" +
    "[1518-03-24 00:04] falls asleep\n" +
    "[1518-10-25 00:38] wakes up\n" +
    "[1518-04-16 00:37] wakes up\n" +
    "[1518-03-18 00:36] falls asleep\n" +
    "[1518-08-07 00:14] falls asleep\n" +
    "[1518-04-15 00:53] wakes up\n" +
    "[1518-05-05 23:49] Guard #353 begins shift\n" +
    "[1518-09-24 23:57] Guard #3449 begins shift\n" +
    "[1518-06-13 00:51] wakes up\n" +
    "[1518-04-20 00:33] wakes up\n" +
    "[1518-10-11 00:54] wakes up\n" +
    "[1518-07-30 00:48] wakes up\n" +
    "[1518-11-08 00:42] wakes up\n" +
    "[1518-11-08 23:53] Guard #3137 begins shift\n" +
    "[1518-03-06 00:28] falls asleep\n" +
    "[1518-09-24 00:17] falls asleep\n" +
    "[1518-02-18 00:27] wakes up\n" +
    "[1518-10-10 00:56] wakes up\n" +
    "[1518-03-27 00:32] wakes up\n" +
    "[1518-06-08 00:33] wakes up\n" +
    "[1518-07-31 00:02] Guard #3119 begins shift\n" +
    "[1518-08-29 00:55] wakes up\n" +
    "[1518-08-08 00:49] wakes up\n" +
    "[1518-06-28 00:47] falls asleep\n" +
    "[1518-09-21 00:44] falls asleep\n" +
    "[1518-02-20 00:00] Guard #2143 begins shift\n" +
    "[1518-11-18 00:42] falls asleep\n" +
    "[1518-07-23 00:01] falls asleep\n" +
    "[1518-09-19 00:49] wakes up\n" +
    "[1518-09-26 00:20] falls asleep\n" +
    "[1518-06-03 00:18] wakes up\n" +
    "[1518-07-30 00:45] falls asleep\n" +
    "[1518-08-12 00:40] wakes up\n" +
    "[1518-08-06 00:01] falls asleep\n" +
    "[1518-10-13 00:25] wakes up\n" +
    "[1518-03-18 23:56] Guard #1759 begins shift\n" +
    "[1518-02-13 00:49] wakes up\n" +
    "[1518-03-14 00:57] wakes up\n" +
    "[1518-04-14 00:29] wakes up\n" +
    "[1518-02-13 00:00] Guard #2969 begins shift\n" +
    "[1518-03-06 00:42] wakes up\n" +
    "[1518-11-15 00:45] falls asleep\n" +
    "[1518-04-24 00:18] falls asleep\n" +
    "[1518-07-22 00:32] falls asleep\n" +
    "[1518-11-20 23:59] Guard #1759 begins shift\n" +
    "[1518-08-05 00:52] wakes up\n" +
    "[1518-07-28 00:56] wakes up\n" +
    "[1518-07-10 00:42] wakes up\n" +
    "[1518-08-01 00:04] Guard #829 begins shift\n" +
    "[1518-06-07 23:58] Guard #1069 begins shift\n" +
    "[1518-02-11 00:39] wakes up\n" +
    "[1518-07-09 00:22] falls asleep\n" +
    "[1518-02-13 00:35] wakes up\n" +
    "[1518-06-06 00:04] wakes up\n" +
    "[1518-07-07 00:55] wakes up\n" +
    "[1518-09-22 23:56] Guard #1907 begins shift\n" +
    "[1518-04-10 00:27] falls asleep\n" +
    "[1518-11-03 00:36] falls asleep\n" +
    "[1518-07-09 00:00] Guard #2063 begins shift\n" +
    "[1518-06-10 00:42] wakes up\n" +
    "[1518-11-20 00:45] falls asleep\n" +
    "[1518-06-08 00:44] falls asleep\n" +
    "[1518-10-19 00:40] falls asleep\n" +
    "[1518-06-17 00:03] Guard #2969 begins shift\n" +
    "[1518-08-06 00:18] wakes up\n" +
    "[1518-03-15 00:42] wakes up\n" +
    "[1518-10-06 00:54] wakes up\n" +
    "[1518-09-27 00:57] wakes up\n" +
    "[1518-03-28 00:40] falls asleep\n" +
    "[1518-07-24 23:56] Guard #3449 begins shift\n" +
    "[1518-02-15 00:49] falls asleep\n" +
    "[1518-11-15 00:00] Guard #2143 begins shift\n" +
    "[1518-04-30 00:27] wakes up\n" +
    "[1518-05-28 00:01] Guard #829 begins shift\n" +
    "[1518-06-17 00:31] falls asleep\n" +
    "[1518-02-19 00:21] wakes up\n" +
    "[1518-11-03 00:41] wakes up\n" +
    "[1518-06-04 00:02] Guard #2593 begins shift\n" +
    "[1518-08-03 23:49] Guard #2063 begins shift\n" +
    "[1518-11-02 00:28] falls asleep\n" +
    "[1518-11-11 00:58] wakes up\n" +
    "[1518-03-28 00:59] wakes up\n" +
    "[1518-09-15 00:58] wakes up\n" +
    "[1518-04-29 00:28] falls asleep\n" +
    "[1518-11-14 00:04] Guard #3137 begins shift\n" +
    "[1518-02-22 00:19] falls asleep\n" +
    "[1518-08-02 00:44] falls asleep\n" +
    "[1518-10-06 00:40] wakes up\n" +
    "[1518-02-18 00:55] falls asleep\n" +
    "[1518-03-15 00:59] wakes up\n" +
    "[1518-03-20 23:56] Guard #2593 begins shift\n" +
    "[1518-02-15 00:46] wakes up\n" +
    "[1518-07-15 00:57] wakes up\n" +
    "[1518-08-26 00:58] wakes up\n" +
    "[1518-02-18 00:16] falls asleep\n" +
    "[1518-04-06 00:22] falls asleep\n" +
    "[1518-03-20 00:28] falls asleep\n" +
    "[1518-04-05 00:03] Guard #2143 begins shift\n" +
    "[1518-10-20 00:02] Guard #2063 begins shift\n" +
    "[1518-07-24 00:58] wakes up\n" +
    "[1518-10-01 00:02] Guard #3571 begins shift\n" +
    "[1518-07-26 00:04] Guard #1747 begins shift\n" +
    "[1518-04-25 00:41] falls asleep\n" +
    "[1518-05-13 00:00] Guard #2593 begins shift\n" +
    "[1518-02-11 00:00] Guard #347 begins shift\n" +
    "[1518-06-07 00:48] wakes up\n" +
    "[1518-05-16 00:53] wakes up\n" +
    "[1518-07-04 00:26] wakes up\n" +
    "[1518-05-22 00:04] Guard #1907 begins shift\n" +
    "[1518-08-19 00:34] wakes up\n" +
    "[1518-06-23 00:02] Guard #2063 begins shift\n" +
    "[1518-10-26 23:57] Guard #401 begins shift\n" +
    "[1518-10-28 00:39] wakes up\n" +
    "[1518-09-04 00:59] wakes up\n" +
    "[1518-07-05 00:04] falls asleep\n" +
    "[1518-09-14 00:00] Guard #1759 begins shift\n" +
    "[1518-07-30 00:07] falls asleep\n" +
    "[1518-07-16 00:51] wakes up\n" +
    "[1518-09-27 00:50] falls asleep\n" +
    "[1518-03-10 00:32] falls asleep\n" +
    "[1518-09-01 00:50] falls asleep\n" +
    "[1518-03-08 00:50] wakes up\n" +
    "[1518-04-12 00:11] falls asleep\n" +
    "[1518-09-19 00:01] Guard #1069 begins shift\n" +
    "[1518-07-20 00:00] falls asleep\n" +
    "[1518-07-05 00:22] falls asleep\n" +
    "[1518-07-19 00:55] wakes up\n" +
    "[1518-11-02 00:00] Guard #3137 begins shift\n" +
    "[1518-06-19 00:01] Guard #1747 begins shift\n" +
    "[1518-11-22 00:04] Guard #347 begins shift\n" +
    "[1518-09-07 00:32] wakes up\n" +
    "[1518-05-29 00:28] wakes up\n" +
    "[1518-02-16 00:02] falls asleep\n" +
    "[1518-02-17 00:03] Guard #827 begins shift\n" +
    "[1518-04-28 00:23] wakes up\n" +
    "[1518-09-12 00:17] falls asleep\n" +
    "[1518-06-27 00:49] wakes up\n" +
    "[1518-06-28 00:58] wakes up\n" +
    "[1518-05-11 23:59] Guard #3361 begins shift\n" +
    "[1518-10-17 00:13] falls asleep\n" +
    "[1518-06-14 00:56] wakes up\n" +
    "[1518-08-14 23:59] Guard #3449 begins shift\n" +
    "[1518-03-21 00:23] falls asleep\n" +
    "[1518-06-26 00:17] falls asleep\n" +
    "[1518-08-15 23:58] Guard #1069 begins shift\n" +
    "[1518-09-29 00:45] wakes up\n" +
    "[1518-06-06 00:54] falls asleep\n" +
    "[1518-08-18 00:45] wakes up\n" +
    "[1518-06-02 00:20] falls asleep\n" +
    "[1518-10-06 00:52] falls asleep\n" +
    "[1518-10-04 00:21] falls asleep\n" +
    "[1518-10-31 23:56] Guard #2969 begins shift\n" +
    "[1518-09-29 00:52] falls asleep\n" +
    "[1518-04-10 00:51] wakes up\n" +
    "[1518-11-10 00:34] wakes up\n" +
    "[1518-09-04 00:57] falls asleep\n" +
    "[1518-08-19 00:13] falls asleep\n" +
    "[1518-04-03 00:06] falls asleep\n" +
    "[1518-02-11 00:35] falls asleep\n" +
    "[1518-05-03 00:19] falls asleep\n" +
    "[1518-08-13 00:36] falls asleep\n" +
    "[1518-05-20 00:15] falls asleep\n" +
    "[1518-03-16 00:50] falls asleep\n" +
    "[1518-04-20 00:23] falls asleep\n" +
    "[1518-08-05 00:03] Guard #2143 begins shift\n" +
    "[1518-03-30 00:09] falls asleep\n" +
    "[1518-08-03 00:18] falls asleep\n" +
    "[1518-04-02 00:04] falls asleep\n" +
    "[1518-03-03 23:56] Guard #2287 begins shift\n" +
    "[1518-02-15 00:03] Guard #3571 begins shift\n" +
    "[1518-08-28 00:15] falls asleep\n" +
    "[1518-03-30 00:54] wakes up\n" +
    "[1518-04-26 00:26] falls asleep\n" +
    "[1518-10-13 00:28] falls asleep\n" +
    "[1518-06-08 00:57] wakes up\n" +
    "[1518-08-15 00:29] falls asleep\n" +
    "[1518-02-13 00:52] falls asleep\n" +
    "[1518-11-01 00:43] wakes up\n" +
    "[1518-04-21 23:57] Guard #3449 begins shift\n" +
    "[1518-09-21 00:20] falls asleep\n" +
    "[1518-09-14 00:22] falls asleep\n" +
    "[1518-09-05 23:49] Guard #1759 begins shift\n" +
    "[1518-07-17 00:00] Guard #2063 begins shift\n" +
    "[1518-05-31 00:04] falls asleep\n" +
    "[1518-05-06 00:54] falls asleep\n" +
    "[1518-06-05 00:35] falls asleep\n" +
    "[1518-07-22 00:52] wakes up\n" +
    "[1518-11-13 00:17] wakes up\n" +
    "[1518-06-29 00:50] falls asleep\n" +
    "[1518-09-21 00:26] wakes up\n" +
    "[1518-06-20 00:00] Guard #347 begins shift\n" +
    "[1518-10-16 23:58] Guard #337 begins shift\n" +
    "[1518-03-19 00:57] falls asleep\n" +
    "[1518-05-29 00:01] Guard #3361 begins shift\n" +
    "[1518-05-21 00:40] falls asleep\n" +
    "[1518-04-22 00:39] falls asleep\n" +
    "[1518-11-04 00:36] wakes up\n" +
    "[1518-07-29 00:25] wakes up\n" +
    "[1518-10-03 00:36] wakes up\n" +
    "[1518-06-16 00:38] wakes up\n" +
    "[1518-03-18 00:02] Guard #2381 begins shift\n" +
    "[1518-03-01 00:45] falls asleep\n" +
    "[1518-08-05 23:52] Guard #3137 begins shift\n" +
    "[1518-02-22 00:00] Guard #337 begins shift\n" +
    "[1518-10-21 00:35] wakes up\n" +
    "[1518-07-29 00:10] falls asleep\n" +
    "[1518-08-07 00:46] wakes up\n" +
    "[1518-02-26 00:48] falls asleep\n" +
    "[1518-10-20 00:53] wakes up\n" +
    "[1518-11-22 00:08] falls asleep\n" +
    "[1518-08-12 23:57] Guard #347 begins shift\n" +
    "[1518-09-12 00:01] Guard #3571 begins shift\n" +
    "[1518-08-27 00:36] wakes up\n" +
    "[1518-11-12 00:55] wakes up\n" +
    "[1518-04-23 00:23] wakes up\n" +
    "[1518-10-02 00:58] wakes up\n" +
    "[1518-06-18 00:13] falls asleep\n" +
    "[1518-05-30 00:48] wakes up\n" +
    "[1518-09-06 00:49] wakes up\n" +
    "[1518-08-28 00:26] wakes up\n" +
    "[1518-04-29 00:00] Guard #2063 begins shift\n" +
    "[1518-11-23 00:36] wakes up\n" +
    "[1518-10-29 00:00] Guard #353 begins shift\n" +
    "[1518-06-11 00:44] wakes up\n" +
    "[1518-08-29 00:27] wakes up\n" +
    "[1518-09-16 00:38] wakes up\n" +
    "[1518-04-02 00:18] falls asleep\n" +
    "[1518-04-25 00:18] falls asleep\n" +
    "[1518-05-13 00:47] wakes up\n" +
    "[1518-06-06 00:24] falls asleep\n" +
    "[1518-02-26 00:04] Guard #1759 begins shift\n" +
    "[1518-02-21 00:08] falls asleep\n" +
    "[1518-03-02 00:02] Guard #1907 begins shift\n" +
    "[1518-11-19 00:05] falls asleep\n" +
    "[1518-05-01 00:02] Guard #1163 begins shift\n" +
    "[1518-08-14 00:44] wakes up\n" +
    "[1518-06-17 00:58] wakes up\n" +
    "[1518-08-27 00:28] wakes up\n" +
    "[1518-06-20 00:55] wakes up\n" +
    "[1518-10-15 00:37] wakes up\n" +
    "[1518-05-05 00:05] falls asleep\n" +
    "[1518-03-30 00:52] falls asleep\n" +
    "[1518-07-17 00:26] falls asleep\n" +
    "[1518-07-29 00:41] wakes up\n" +
    "[1518-09-28 00:01] Guard #347 begins shift\n" +
    "[1518-06-12 00:50] falls asleep\n" +
    "[1518-06-26 23:56] Guard #1163 begins shift\n" +
    "[1518-09-21 23:52] Guard #3361 begins shift\n" +
    "[1518-07-01 23:58] Guard #1907 begins shift\n" +
    "[1518-11-04 23:58] Guard #3571 begins shift\n" +
    "[1518-10-25 00:02] Guard #3361 begins shift\n" +
    "[1518-03-23 00:50] wakes up\n" +
    "[1518-06-09 00:40] wakes up\n" +
    "[1518-07-11 00:00] Guard #1747 begins shift\n" +
    "[1518-09-28 00:16] falls asleep\n" +
    "[1518-09-23 00:56] wakes up\n" +
    "[1518-06-16 00:17] falls asleep\n" +
    "[1518-10-24 00:49] wakes up\n" +
    "[1518-07-20 00:34] wakes up\n" +
    "[1518-04-15 00:35] wakes up\n" +
    "[1518-05-21 00:56] wakes up\n" +
    "[1518-06-27 00:35] falls asleep\n" +
    "[1518-03-13 00:58] wakes up\n" +
    "[1518-05-19 00:01] falls asleep\n" +
    "[1518-05-25 00:21] falls asleep\n" +
    "[1518-08-27 00:47] falls asleep\n" +
    "[1518-08-19 00:00] Guard #1747 begins shift\n" +
    "[1518-06-21 00:34] falls asleep\n" +
    "[1518-08-11 23:57] Guard #2969 begins shift\n" +
    "[1518-04-23 23:57] Guard #2381 begins shift\n" +
    "[1518-07-16 00:02] Guard #3361 begins shift\n" +
    "[1518-10-20 23:56] Guard #2063 begins shift\n" +
    "[1518-03-31 00:31] falls asleep\n" +
    "[1518-03-12 00:56] wakes up\n" +
    "[1518-06-29 00:00] Guard #1163 begins shift\n" +
    "[1518-06-13 00:37] wakes up\n" +
    "[1518-04-04 00:51] falls asleep\n" +
    "[1518-11-05 00:53] falls asleep\n" +
    "[1518-04-26 00:02] Guard #353 begins shift\n" +
    "[1518-05-24 00:04] falls asleep\n" +
    "[1518-10-30 00:26] falls asleep\n" +
    "[1518-11-19 00:58] wakes up\n" +
    "[1518-05-06 00:56] wakes up\n" +
    "[1518-06-23 00:49] wakes up\n" +
    "[1518-11-04 00:39] falls asleep\n" +
    "[1518-08-30 23:48] Guard #3361 begins shift\n" +
    "[1518-04-05 00:39] falls asleep\n" +
    "[1518-05-02 00:50] wakes up\n" +
    "[1518-03-21 23:46] Guard #829 begins shift\n" +
    "[1518-09-02 00:11] falls asleep\n" +
    "[1518-10-02 00:46] falls asleep\n" +
    "[1518-06-02 00:02] Guard #337 begins shift\n" +
    "[1518-06-06 00:41] wakes up\n" +
    "[1518-04-02 00:46] wakes up\n" +
    "[1518-09-18 00:01] Guard #827 begins shift\n" +
    "[1518-07-15 00:03] Guard #2063 begins shift\n" +
    "[1518-03-29 23:59] Guard #353 begins shift\n" +
    "[1518-05-11 00:40] falls asleep\n" +
    "[1518-02-17 00:44] falls asleep\n" +
    "[1518-10-28 00:57] falls asleep\n" +
    "[1518-04-07 00:25] wakes up\n" +
    "[1518-10-12 00:59] wakes up\n" +
    "[1518-08-21 00:59] wakes up\n" +
    "[1518-09-28 00:23] wakes up\n" +
    "[1518-03-29 00:29] falls asleep\n" +
    "[1518-03-19 00:58] wakes up\n" +
    "[1518-03-24 00:24] wakes up\n" +
    "[1518-04-23 00:43] falls asleep\n" +
    "[1518-08-22 23:58] Guard #829 begins shift\n" +
    "[1518-04-28 00:56] wakes up\n" +
    "[1518-04-18 00:36] wakes up\n" +
    "[1518-03-11 23:54] Guard #1759 begins shift\n" +
    "[1518-03-25 00:00] Guard #3137 begins shift\n" +
    "[1518-10-06 00:01] Guard #2143 begins shift\n" +
    "[1518-07-30 00:19] wakes up\n" +
    "[1518-07-04 00:49] wakes up\n" +
    "[1518-07-05 00:34] wakes up\n" +
    "[1518-06-09 23:59] Guard #1069 begins shift\n" +
    "[1518-07-06 00:21] wakes up\n" +
    "[1518-04-24 00:40] wakes up\n" +
    "[1518-03-18 00:59] wakes up\n" +
    "[1518-06-15 00:04] Guard #1747 begins shift\n" +
    "[1518-11-20 00:29] wakes up\n" +
    "[1518-11-06 23:59] Guard #1747 begins shift\n" +
    "[1518-06-25 00:59] wakes up\n" +
    "[1518-02-26 00:54] wakes up\n" +
    "[1518-08-30 00:35] wakes up\n" +
    "[1518-05-12 00:33] falls asleep\n" +
    "[1518-03-05 00:42] falls asleep\n" +
    "[1518-06-05 00:54] wakes up\n" +
    "[1518-04-17 00:45] wakes up\n" +
    "[1518-05-07 00:16] falls asleep\n" +
    "[1518-11-17 00:55] wakes up\n" +
    "[1518-11-07 00:34] falls asleep\n" +
    "[1518-07-14 00:57] wakes up\n" +
    "[1518-09-12 00:59] wakes up\n" +
    "[1518-10-31 00:24] wakes up\n" +
    "[1518-11-07 23:59] Guard #2381 begins shift\n" +
    "[1518-07-18 00:00] Guard #337 begins shift\n" +
    "[1518-11-01 00:52] wakes up\n" +
    "[1518-06-02 23:58] Guard #2143 begins shift\n" +
    "[1518-08-04 00:33] wakes up\n" +
    "[1518-04-04 00:59] wakes up\n" +
    "[1518-04-07 00:00] Guard #353 begins shift\n" +
    "[1518-04-19 23:56] Guard #1069 begins shift\n" +
    "[1518-10-24 00:04] Guard #347 begins shift\n" +
    "[1518-03-15 23:49] Guard #353 begins shift\n" +
    "[1518-10-29 00:44] wakes up\n" +
    "[1518-06-04 00:27] falls asleep\n" +
    "[1518-08-06 23:59] Guard #2063 begins shift\n" +
    "[1518-11-13 00:02] falls asleep\n" +
    "[1518-07-01 00:04] Guard #1163 begins shift\n" +
    "[1518-03-08 23:52] Guard #2593 begins shift\n" +
    "[1518-07-19 23:48] Guard #3361 begins shift\n" +
    "[1518-07-23 00:32] falls asleep\n" +
    "[1518-07-28 00:01] Guard #1759 begins shift\n" +
    "[1518-11-20 00:52] wakes up\n" +
    "[1518-04-18 00:25] wakes up\n" +
    "[1518-08-02 00:58] wakes up\n" +
    "[1518-07-26 00:56] wakes up\n" +
    "[1518-08-20 23:48] Guard #347 begins shift\n" +
    "[1518-06-09 00:08] falls asleep\n" +
    "[1518-04-08 00:40] wakes up\n" +
    "[1518-02-25 00:25] falls asleep\n" +
    "[1518-11-13 00:39] falls asleep\n" +
    "[1518-04-15 23:54] Guard #2287 begins shift\n" +
    "[1518-04-06 00:59] wakes up\n" +
    "[1518-08-22 00:24] falls asleep\n" +
    "[1518-03-06 00:34] wakes up\n" +
    "[1518-02-19 00:18] falls asleep\n" +
    "[1518-02-19 00:04] Guard #1163 begins shift\n" +
    "[1518-05-15 23:58] Guard #3449 begins shift\n" +
    "[1518-07-20 00:28] falls asleep\n" +
    "[1518-04-04 00:23] falls asleep\n" +
    "[1518-02-12 00:02] Guard #3571 begins shift\n" +
    "[1518-07-24 00:24] falls asleep\n" +
    "[1518-03-05 00:32] falls asleep\n" +
    "[1518-03-31 00:53] falls asleep\n" +
    "[1518-08-02 00:52] wakes up\n" +
    "[1518-06-14 00:25] wakes up\n" +
    "[1518-04-25 00:54] falls asleep\n" +
    "[1518-09-27 00:02] Guard #1759 begins shift\n" +
    "[1518-08-11 00:50] wakes up\n" +
    "[1518-09-26 00:59] wakes up\n" +
    "[1518-05-18 00:00] Guard #3361 begins shift\n" +
    "[1518-05-13 23:59] Guard #3119 begins shift\n" +
    "[1518-10-25 00:07] falls asleep\n" +
    "[1518-11-19 00:28] falls asleep\n" +
    "[1518-04-03 00:02] Guard #1069 begins shift\n" +
    "[1518-10-07 00:56] wakes up\n" +
    "[1518-04-28 00:54] falls asleep\n" +
    "[1518-03-11 00:53] falls asleep\n" +
    "[1518-03-04 00:16] falls asleep\n" +
    "[1518-08-28 00:56] wakes up\n" +
    "[1518-09-05 00:43] falls asleep\n" +
    "[1518-08-21 00:52] wakes up\n" +
    "[1518-07-11 00:30] falls asleep\n" +
    "[1518-06-10 00:57] falls asleep\n" +
    "[1518-02-15 00:57] wakes up\n" +
    "[1518-05-05 00:25] falls asleep\n" +
    "[1518-09-11 00:03] Guard #827 begins shift\n" +
    "[1518-02-13 00:57] wakes up\n" +
    "[1518-04-07 00:15] falls asleep\n" +
    "[1518-08-01 00:54] wakes up\n" +
    "[1518-03-26 00:19] falls asleep\n" +
    "[1518-10-21 23:56] Guard #3119 begins shift\n" +
    "[1518-04-28 00:21] falls asleep\n" +
    "[1518-06-10 00:51] wakes up\n" +
    "[1518-05-29 00:24] falls asleep\n" +
    "[1518-05-15 00:58] wakes up\n" +
    "[1518-08-04 00:44] falls asleep\n" +
    "[1518-02-15 00:21] falls asleep\n" +
    "[1518-08-02 00:55] falls asleep\n" +
    "[1518-03-16 00:27] wakes up\n" +
    "[1518-03-22 00:55] wakes up\n" +
    "[1518-04-01 00:15] falls asleep\n" +
    "[1518-04-30 00:08] wakes up\n" +
    "[1518-05-22 23:58] Guard #1759 begins shift\n" +
    "[1518-10-06 00:06] falls asleep\n" +
    "[1518-10-05 00:29] falls asleep\n" +
    "[1518-07-15 00:25] falls asleep\n" +
    "[1518-08-13 23:56] Guard #1759 begins shift\n" +
    "[1518-05-07 00:01] Guard #3571 begins shift\n" +
    "[1518-03-28 00:57] falls asleep\n" +
    "[1518-04-29 23:57] Guard #827 begins shift\n" +
    "[1518-11-18 00:45] wakes up\n" +
    "[1518-05-07 00:59] wakes up\n" +
    "[1518-08-02 00:04] Guard #3571 begins shift\n" +
    "[1518-10-30 00:48] wakes up\n" +
    "[1518-03-23 00:57] wakes up\n" +
    "[1518-04-28 00:38] falls asleep\n" +
    "[1518-10-18 00:32] wakes up\n" +
    "[1518-03-07 00:23] wakes up\n" +
    "[1518-03-16 00:47] wakes up\n" +
    "[1518-02-25 00:54] wakes up\n" +
    "[1518-02-23 00:52] falls asleep\n" +
    "[1518-06-18 00:56] wakes up\n" +
    "[1518-08-20 00:38] falls asleep\n" +
    "[1518-03-31 00:39] wakes up\n" +
    "[1518-03-25 00:24] falls asleep\n" +
    "[1518-09-24 00:38] wakes up\n" +
    "[1518-05-27 00:01] Guard #1759 begins shift\n" +
    "[1518-11-22 00:49] wakes up\n" +
    "[1518-04-27 00:03] Guard #3571 begins shift\n" +
    "[1518-03-07 23:59] Guard #337 begins shift\n" +
    "[1518-11-02 00:58] wakes up\n" +
    "[1518-08-08 00:25] falls asleep\n" +
    "[1518-03-25 00:58] wakes up\n" +
    "[1518-04-25 00:58] wakes up\n" +
    "[1518-07-10 00:04] Guard #3361 begins shift\n" +
    "[1518-11-15 00:59] wakes up\n" +
    "[1518-03-16 00:35] falls asleep\n" +
    "[1518-10-21 00:27] falls asleep\n" +
    "[1518-06-08 00:32] falls asleep\n" +
    "[1518-10-18 00:27] falls asleep\n" +
    "[1518-04-08 00:04] Guard #1069 begins shift\n" +
    "[1518-06-24 23:50] Guard #2287 begins shift\n" +
    "[1518-09-13 00:54] wakes up\n" +
    "[1518-04-25 00:46] wakes up\n" +
    "[1518-10-26 00:58] wakes up\n" +
    "[1518-03-14 23:57] Guard #337 begins shift\n" +
    "[1518-06-04 00:58] wakes up\n" +
    "[1518-03-12 00:29] wakes up\n" +
    "[1518-07-21 00:02] Guard #829 begins shift\n" +
    "[1518-10-16 00:44] falls asleep\n" +
    "[1518-02-11 00:53] falls asleep\n" +
    "[1518-08-16 00:56] wakes up\n" +
    "[1518-03-22 00:02] falls asleep\n" +
    "[1518-05-07 23:50] Guard #1907 begins shift\n" +
    "[1518-04-03 23:56] Guard #347 begins shift\n" +
    "[1518-10-08 00:20] falls asleep\n" +
    "[1518-03-15 00:48] falls asleep\n" +
    "[1518-08-06 00:57] wakes up\n" +
    "[1518-04-13 23:51] Guard #2593 begins shift\n" +
    "[1518-08-27 00:33] falls asleep\n" +
    "[1518-06-13 00:32] falls asleep\n" +
    "[1518-03-03 00:57] wakes up\n" +
    "[1518-03-30 00:49] wakes up\n" +
    "[1518-05-20 00:52] wakes up\n" +
    "[1518-06-15 00:52] wakes up\n" +
    "[1518-03-23 00:53] falls asleep\n" +
    "[1518-06-23 00:46] falls asleep\n" +
    "[1518-11-09 00:49] falls asleep\n" +
    "[1518-11-20 00:25] falls asleep\n" +
    "[1518-10-16 00:03] Guard #2969 begins shift\n" +
    "[1518-08-26 00:56] falls asleep\n" +
    "[1518-04-24 00:52] wakes up\n" +
    "[1518-11-05 00:20] falls asleep\n" +
    "[1518-04-01 23:54] Guard #2381 begins shift\n" +
    "[1518-05-10 00:55] wakes up\n" +
    "[1518-11-05 00:54] wakes up\n" +
    "[1518-09-14 23:58] Guard #1069 begins shift\n" +
    "[1518-03-20 00:55] falls asleep\n" +
    "[1518-10-16 00:45] wakes up\n" +
    "[1518-09-11 00:46] falls asleep\n" +
    "[1518-03-04 23:58] Guard #3361 begins shift\n" +
    "[1518-06-03 00:53] wakes up\n" +
    "[1518-02-23 23:59] Guard #1907 begins shift\n" +
    "[1518-06-22 00:56] wakes up\n" +
    "[1518-03-01 00:03] Guard #1759 begins shift\n" +
    "[1518-06-10 00:47] falls asleep\n" +
    "[1518-10-08 23:50] Guard #1747 begins shift\n" +
    "[1518-09-07 00:23] falls asleep\n" +
    "[1518-05-15 00:53] falls asleep\n" +
    "[1518-11-14 00:14] falls asleep\n" +
    "[1518-07-07 00:00] Guard #347 begins shift\n" +
    "[1518-05-23 00:57] wakes up\n" +
    "[1518-06-12 00:59] wakes up\n" +
    "[1518-10-08 00:54] wakes up\n" +
    "[1518-06-19 00:30] falls asleep\n" +
    "[1518-10-05 00:34] wakes up\n" +
    "[1518-11-12 00:39] falls asleep\n" +
    "[1518-02-23 00:44] falls asleep\n" +
    "[1518-08-14 00:28] falls asleep\n" +
    "[1518-09-11 00:20] falls asleep\n" +
    "[1518-11-16 00:00] Guard #347 begins shift\n" +
    "[1518-10-14 00:56] falls asleep\n" +
    "[1518-09-11 00:52] wakes up\n" +
    "[1518-05-10 23:58] Guard #1163 begins shift\n" +
    "[1518-08-05 00:24] falls asleep\n" +
    "[1518-07-12 00:11] falls asleep\n" +
    "[1518-11-16 00:33] falls asleep\n" +
    "[1518-10-11 00:26] falls asleep\n" +
    "[1518-10-31 00:01] Guard #2063 begins shift\n" +
    "[1518-03-01 00:55] wakes up\n" +
    "[1518-07-06 00:10] falls asleep\n" +
    "[1518-02-20 00:21] wakes up\n" +
    "[1518-09-16 00:47] wakes up\n" +
    "[1518-06-13 00:00] Guard #2381 begins shift\n" +
    "[1518-03-12 00:04] falls asleep\n" +
    "[1518-06-02 00:29] wakes up\n" +
    "[1518-07-04 23:50] Guard #2287 begins shift\n" +
    "[1518-07-18 00:33] falls asleep\n" +
    "[1518-02-21 00:58] wakes up\n" +
    "[1518-05-06 00:02] falls asleep\n" +
    "[1518-06-16 00:58] wakes up\n" +
    "[1518-10-23 00:37] wakes up\n" +
    "[1518-06-10 23:57] Guard #1907 begins shift\n" +
    "[1518-05-16 00:07] falls asleep\n" +
    "[1518-03-08 00:59] wakes up\n" +
    "[1518-06-24 00:57] wakes up\n" +
    "[1518-06-25 00:05] falls asleep\n" +
    "[1518-10-08 00:17] wakes up\n" +
    "[1518-09-04 00:38] wakes up\n" +
    "[1518-05-26 00:53] wakes up\n" +
    "[1518-07-21 23:56] Guard #3137 begins shift\n" +
    "[1518-03-11 00:33] falls asleep\n" +
    "[1518-05-07 00:40] falls asleep\n" +
    "[1518-11-01 00:32] falls asleep\n" +
    "[1518-09-21 00:55] wakes up\n" +
    "[1518-11-12 00:23] wakes up\n" +
    "[1518-03-09 00:44] wakes up\n" +
    "[1518-08-04 00:48] wakes up\n" +
    "[1518-06-25 23:58] Guard #347 begins shift\n" +
    "[1518-03-31 00:03] Guard #829 begins shift\n" +
    "[1518-07-22 23:48] Guard #2287 begins shift\n" +
    "[1518-02-27 00:40] falls asleep\n" +
    "[1518-10-02 00:23] falls asleep\n" +
    "[1518-02-25 00:03] Guard #3361 begins shift\n" +
    "[1518-07-23 00:27] wakes up\n" +
    "[1518-03-07 00:02] Guard #2381 begins shift\n" +
    "[1518-11-09 00:31] wakes up\n" +
    "[1518-02-20 00:29] falls asleep\n" +
    "[1518-06-21 23:56] Guard #353 begins shift\n" +
    "[1518-05-18 00:26] falls asleep\n" +
    "[1518-04-17 00:18] falls asleep\n" +
    "[1518-05-02 00:18] wakes up\n" +
    "[1518-03-14 00:32] wakes up\n" +
    "[1518-02-27 00:58] wakes up\n" +
    "[1518-02-12 00:06] falls asleep\n" +
    "[1518-08-24 23:58] Guard #827 begins shift\n" +
    "[1518-10-10 00:19] falls asleep\n" +
    "[1518-06-01 00:02] Guard #347 begins shift\n" +
    "[1518-05-08 00:53] wakes up\n" +
    "[1518-09-03 00:46] wakes up\n" +
    "[1518-03-12 00:47] falls asleep\n" +
    "[1518-07-11 00:38] wakes up\n" +
    "[1518-08-04 00:27] falls asleep\n" +
    "[1518-07-09 00:44] wakes up\n" +
    "[1518-04-09 00:59] wakes up\n" +
    "[1518-03-31 00:56] wakes up\n" +
    "[1518-05-12 00:51] wakes up\n" +
    "[1518-11-22 00:30] falls asleep\n" +
    "[1518-05-25 00:55] wakes up\n" +
    "[1518-07-21 00:55] wakes up\n" +
    "[1518-11-04 00:29] falls asleep\n" +
    "[1518-06-05 00:04] Guard #829 begins shift\n" +
    "[1518-11-03 00:30] wakes up\n" +
    "[1518-11-02 00:56] falls asleep\n" +
    "[1518-08-17 23:46] Guard #3571 begins shift\n" +
    "[1518-10-13 00:54] wakes up\n" +
    "[1518-03-08 00:56] falls asleep\n" +
    "[1518-09-07 23:56] Guard #3137 begins shift\n" +
    "[1518-02-27 00:01] Guard #347 begins shift\n" +
    "[1518-07-02 00:13] falls asleep\n" +
    "[1518-08-18 00:03] wakes up\n" +
    "[1518-06-24 00:42] wakes up\n" +
    "[1518-10-04 00:28] wakes up\n" +
    "[1518-03-05 23:57] Guard #1747 begins shift\n" +
    "[1518-09-11 00:24] wakes up\n" +
    "[1518-10-31 00:17] falls asleep\n" +
    "[1518-08-23 00:32] falls asleep\n" +
    "[1518-10-04 00:37] falls asleep\n" +
    "[1518-07-16 00:35] wakes up\n" +
    "[1518-04-08 00:12] falls asleep\n" +
    "[1518-02-28 00:57] wakes up\n" +
    "[1518-11-12 23:52] Guard #827 begins shift\n" +
    "[1518-07-08 00:01] Guard #3571 begins shift\n" +
    "[1518-11-04 00:53] wakes up\n" +
    "[1518-11-10 00:02] Guard #353 begins shift\n" +
    "[1518-04-06 00:57] falls asleep\n" +
    "[1518-05-22 00:24] wakes up\n" +
    "[1518-06-29 23:51] Guard #3571 begins shift\n" +
    "[1518-11-01 00:50] falls asleep\n" +
    "[1518-02-20 00:12] falls asleep\n" +
    "[1518-03-10 00:00] Guard #353 begins shift\n" +
    "[1518-05-02 00:10] falls asleep\n" +
    "[1518-07-03 00:35] falls asleep\n" +
    "[1518-07-15 00:48] wakes up\n" +
    "[1518-08-01 00:49] falls asleep\n" +
    "[1518-10-04 23:59] Guard #3361 begins shift\n" +
    "[1518-10-04 00:00] Guard #2593 begins shift\n" +
    "[1518-05-04 23:54] Guard #1747 begins shift\n" +
    "[1518-05-02 00:28] falls asleep\n" +
    "[1518-09-14 00:41] wakes up\n" +
    "[1518-11-17 00:54] falls asleep\n" +
    "[1518-10-04 00:44] wakes up\n" +
    "[1518-11-17 00:26] falls asleep\n" +
    "[1518-04-12 00:55] wakes up\n" +
    "[1518-09-20 00:04] Guard #829 begins shift\n" +
    "[1518-02-23 00:21] falls asleep\n" +
    "[1518-02-13 00:32] falls asleep\n" +
    "[1518-05-17 00:12] falls asleep\n" +
    "[1518-04-24 00:43] falls asleep\n" +
    "[1518-10-13 00:15] falls asleep\n" +
    "[1518-06-06 00:03] falls asleep\n" +
    "[1518-08-07 23:59] Guard #2063 begins shift\n" +
    "[1518-02-16 00:10] wakes up\n" +
    "[1518-06-01 00:54] wakes up\n" +
    "[1518-09-13 00:52] falls asleep\n" +
    "[1518-05-07 00:34] wakes up\n" +
    "[1518-04-18 00:28] falls asleep\n" +
    "[1518-09-09 00:04] Guard #2063 begins shift\n" +
    "[1518-04-28 00:01] Guard #3137 begins shift\n" +
    "[1518-06-28 00:02] Guard #3137 begins shift\n" +
    "[1518-09-02 00:13] wakes up\n" +
    "[1518-09-16 00:30] falls asleep\n" +
    "[1518-05-03 00:37] falls asleep\n" +
    "[1518-05-17 00:03] Guard #2063 begins shift\n" +
    "[1518-09-23 00:55] falls asleep\n" +
    "[1518-09-09 00:50] wakes up\n" +
    "[1518-03-03 00:40] falls asleep\n" +
    "[1518-11-13 00:35] wakes up\n" +
    "[1518-09-05 00:21] wakes up\n" +
    "[1518-04-30 00:26] falls asleep\n" +
    "[1518-03-25 00:42] wakes up\n" +
    "[1518-10-20 00:06] falls asleep\n" +
    "[1518-07-12 00:56] wakes up\n" +
    "[1518-07-08 00:56] falls asleep\n" +
    "[1518-10-11 00:00] Guard #2287 begins shift\n" +
    "[1518-07-24 00:50] wakes up\n" +
    "[1518-05-04 00:34] falls asleep\n" +
    "[1518-10-15 00:01] falls asleep\n" +
    "[1518-11-10 23:56] Guard #829 begins shift\n" +
    "[1518-07-19 00:01] Guard #3137 begins shift\n" +
    "[1518-05-09 00:02] Guard #1747 begins shift\n" +
    "[1518-10-29 00:57] wakes up\n" +
    "[1518-08-21 23:57] Guard #829 begins shift\n" +
    "[1518-08-09 00:04] Guard #401 begins shift\n" +
    "[1518-11-10 00:32] falls asleep\n" +
    "[1518-10-22 23:57] Guard #1759 begins shift\n" +
    "[1518-08-11 00:20] falls asleep\n" +
    "[1518-03-13 00:35] falls asleep\n" +
    "[1518-09-02 00:01] Guard #1747 begins shift\n" +
    "[1518-09-15 00:07] falls asleep\n" +
    "[1518-04-14 00:05] falls asleep\n" +
    "[1518-10-14 00:19] falls asleep\n" +
    "[1518-07-18 00:59] wakes up\n" +
    "[1518-07-04 00:09] falls asleep\n" +
    "[1518-11-14 00:20] wakes up\n" +
    "[1518-05-28 00:58] wakes up\n" +
    "[1518-05-15 00:00] Guard #3361 begins shift\n" +
    "[1518-03-19 23:57] Guard #3449 begins shift\n" +
    "[1518-04-07 00:59] wakes up\n" +
    "[1518-08-19 23:57] Guard #827 begins shift\n" +
    "[1518-02-28 00:21] falls asleep\n" +
    "[1518-04-25 00:34] wakes up\n" +
    "[1518-04-23 00:17] falls asleep\n" +
    "[1518-08-23 00:54] wakes up\n" +
    "[1518-10-12 00:15] falls asleep\n" +
    "[1518-02-21 00:04] Guard #3571 begins shift\n" +
    "[1518-09-23 00:51] wakes up\n" +
    "[1518-10-09 00:05] falls asleep\n" +
    "[1518-11-06 00:36] wakes up\n" +
    "[1518-07-16 00:30] falls asleep\n" +
    "[1518-09-04 23:59] Guard #2381 begins shift\n" +
    "[1518-03-02 23:57] Guard #1069 begins shift\n" +
    "[1518-05-15 00:31] falls asleep\n" +
    "[1518-11-14 00:46] wakes up\n" +
    "[1518-09-25 00:57] wakes up\n" +
    "[1518-04-08 00:55] wakes up\n" +
    "[1518-04-21 00:02] Guard #3361 begins shift\n" +
    "[1518-08-28 23:57] Guard #2593 begins shift\n" +
    "[1518-04-08 23:56] Guard #3137 begins shift\n" +
    "[1518-05-08 00:04] falls asleep\n" +
    "[1518-09-15 23:59] Guard #2143 begins shift\n" +
    "[1518-09-03 00:04] Guard #2593 begins shift\n" +
    "[1518-03-25 23:59] Guard #337 begins shift\n" +
    "[1518-10-24 00:54] falls asleep\n" +
    "[1518-04-08 00:54] falls asleep\n" +
    "[1518-02-23 00:41] wakes up\n" +
    "[1518-04-12 00:00] Guard #3449 begins shift\n" +
    "[1518-11-13 00:56] wakes up\n" +
    "[1518-08-15 00:55] wakes up\n" +
    "[1518-09-29 00:59] wakes up\n" +
    "[1518-06-12 00:00] Guard #347 begins shift\n" +
    "[1518-03-07 00:17] falls asleep\n" +
    "[1518-06-26 00:34] wakes up\n" +
    "[1518-04-16 00:04] falls asleep\n" +
    "[1518-08-11 00:27] wakes up\n" +
    "[1518-06-05 23:50] Guard #3137 begins shift\n" +
    "[1518-04-27 00:31] falls asleep\n" +
    "[1518-11-18 00:52] falls asleep\n" +
    "[1518-04-30 00:48] wakes up\n" +
    "[1518-11-10 00:48] falls asleep\n" +
    "[1518-11-16 00:37] wakes up\n" +
    "[1518-03-06 00:37] falls asleep\n" +
    "[1518-09-07 00:59] wakes up\n" +
    "[1518-06-29 00:46] wakes up\n" +
    "[1518-02-22 00:41] wakes up\n" +
    "[1518-02-17 00:51] wakes up\n" +
    "[1518-05-29 00:51] wakes up\n" +
    "[1518-05-05 00:54] wakes up\n" +
    "[1518-09-03 00:08] falls asleep\n" +
    "[1518-06-25 00:57] falls asleep\n" +
    "[1518-09-18 00:40] wakes up\n" +
    "[1518-09-07 00:02] Guard #1759 begins shift\n" +
    "[1518-05-09 00:35] wakes up\n" +
    "[1518-10-13 23:56] Guard #1759 begins shift\n" +
    "[1518-11-06 00:12] wakes up\n" +
    "[1518-06-23 23:57] Guard #2287 begins shift\n" +
    "[1518-10-11 23:59] Guard #347 begins shift\n" +
    "[1518-04-14 00:46] falls asleep\n" +
    "[1518-11-19 00:18] wakes up\n" +
    "[1518-11-16 00:30] wakes up\n" +
    "[1518-11-08 00:53] wakes up\n" +
    "[1518-10-28 00:33] falls asleep\n" +
    "[1518-07-30 00:02] Guard #3571 begins shift\n" +
    "[1518-11-17 00:31] wakes up\n" +
    "[1518-05-19 00:53] wakes up\n" +
    "[1518-08-11 00:46] falls asleep\n" +
    "[1518-02-23 00:03] Guard #827 begins shift\n" +
    "[1518-09-24 00:42] falls asleep\n" +
    "[1518-10-07 00:03] Guard #1907 begins shift\n" +
    "[1518-10-26 00:37] wakes up\n" +
    "[1518-07-17 00:40] wakes up\n" +
    "[1518-11-07 00:39] wakes up\n" +
    "[1518-04-15 00:24] falls asleep\n" +
    "[1518-09-04 00:33] falls asleep\n" +
    "[1518-04-18 23:57] Guard #401 begins shift";

const events = puzzleInput.split("\n").map((eventLine) => GuardEvent.from(eventLine));
console.log("Events:", events.length);

const shifts = GuardShift.fromEvents(events);
console.log("Shifts:", shifts.length);

const profiles = GuardProfile.fromShifts(shifts).sort((left, right) => left.getMinutesAsleep() - right.getMinutesAsleep());
console.log("Guards:", profiles.length);

console.log("Min minutes asleep:", profiles[0].getMinutesAsleep(), `by #${profiles[0].getGuard()}`);
const longestSleepingGuard = profiles[profiles.length - 1];
console.log(
    "Max minutes asleep:", longestSleepingGuard.getMinutesAsleep(),
    `by #${longestSleepingGuard.getGuard()}`,
    "Most sleeping in minute:", longestSleepingGuard.getMaxSleepingMinute(),
    "GuardId * Most sleeping minute:", longestSleepingGuard.getGuard() * longestSleepingGuard.getMaxSleepingMinute()!
);