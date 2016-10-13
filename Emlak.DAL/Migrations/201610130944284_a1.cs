namespace Emlak.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class a1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Fotograflar",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Yol = c.String(nullable: false),
                        KonutID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Konutlar", t => t.KonutID, cascadeDelete: true)
                .Index(t => t.KonutID);
            
            CreateTable(
                "dbo.IlanTurleri",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Ad = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.IsitmaSistemleri",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Ad = c.String(nullable: false, maxLength: 30),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.KatTurleri",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Tur = c.String(nullable: false, maxLength: 15),
                    })
                .PrimaryKey(t => t.ID);
            
            AddColumn("dbo.Konutlar", "KatturID", c => c.Int(nullable: false));
            AddColumn("dbo.Konutlar", "IsitmaSistemiID", c => c.Int(nullable: false));
            AddColumn("dbo.Konutlar", "IlanTuruID", c => c.Int(nullable: false));
            CreateIndex("dbo.Konutlar", "KatturID");
            CreateIndex("dbo.Konutlar", "IsitmaSistemiID");
            CreateIndex("dbo.Konutlar", "IlanTuruID");
            AddForeignKey("dbo.Konutlar", "IlanTuruID", "dbo.IlanTurleri", "ID", cascadeDelete: true);
            AddForeignKey("dbo.Konutlar", "IsitmaSistemiID", "dbo.IsitmaSistemleri", "ID", cascadeDelete: true);
            AddForeignKey("dbo.Konutlar", "KatturID", "dbo.KatTurleri", "ID", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Konutlar", "KatturID", "dbo.KatTurleri");
            DropForeignKey("dbo.Konutlar", "IsitmaSistemiID", "dbo.IsitmaSistemleri");
            DropForeignKey("dbo.Konutlar", "IlanTuruID", "dbo.IlanTurleri");
            DropForeignKey("dbo.Fotograflar", "KonutID", "dbo.Konutlar");
            DropIndex("dbo.Konutlar", new[] { "IlanTuruID" });
            DropIndex("dbo.Konutlar", new[] { "IsitmaSistemiID" });
            DropIndex("dbo.Konutlar", new[] { "KatturID" });
            DropIndex("dbo.Fotograflar", new[] { "KonutID" });
            DropColumn("dbo.Konutlar", "IlanTuruID");
            DropColumn("dbo.Konutlar", "IsitmaSistemiID");
            DropColumn("dbo.Konutlar", "KatturID");
            DropTable("dbo.KatTurleri");
            DropTable("dbo.IsitmaSistemleri");
            DropTable("dbo.IlanTurleri");
            DropTable("dbo.Fotograflar");
        }
    }
}
