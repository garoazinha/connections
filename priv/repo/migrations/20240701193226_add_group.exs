defmodule App.Repo.Migrations.AddGroup do
  use Ecto.Migration

  def change do
    create table(:groups) do
      add :level, :integer
      add :members, :string
      add :title, :string
      add :game_id, references(:games, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end
  end
end
