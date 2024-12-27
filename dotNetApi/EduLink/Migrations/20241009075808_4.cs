using Microsoft.EntityFrameworkCore.Migrations;

namespace EduLink.Migrations
{
    public partial class _4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Submissions",
                newName: "SubmissionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SubmissionId",
                table: "Submissions",
                newName: "Id");
        }
    }
}
