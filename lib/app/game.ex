defmodule App.Game do
  use Ecto.Schema
  import Ecto.Changeset

  schema "games" do
    field :extra, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:extra])
    |> validate_required([:extra])
  end
end
