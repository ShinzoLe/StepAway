create table todo
(
ID int not null primary key,
Task nvarchar(100) not null,
StartTime datetime not null,
EndTime datetime not null
)
