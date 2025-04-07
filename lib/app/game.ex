defmodule App.Game do
  alias App.Group
  use Ecto.Schema
  alias App.Repo
  import Ecto.Changeset
  @derive {Jason.Encoder, only: [:extra, :groups]}

  schema "games" do
    field :extra, :string
    has_many :groups, Group

    timestamps(type: :utc_datetime)
  end

  def add_group(group) do
    IO.puts(group)
  end

  def changeset(game, attrs) do
    game
    |> cast(attrs, [:extra])
    |> Ecto.Changeset.cast_assoc(:groups)
    |> validate_required([:extra])
  end
end
