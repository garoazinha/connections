defmodule App.Game do
  alias App.Group
  use Ecto.Schema
  alias App.Repo
  import Ecto.Changeset

  schema "games" do
    field :extra, :string
    has_many :groups, Group

    timestamps(type: :utc_datetime)
  end

  def add_group(group) do
    IO.puts(group)
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:extra])
    |> validate_required([:extra])
  end
end
