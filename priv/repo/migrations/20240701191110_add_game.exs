defmodule App.Repo.Migrations.AddGame do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :extra, :string

      timestamps(type: :utc_datetime)
    end
  end
end
