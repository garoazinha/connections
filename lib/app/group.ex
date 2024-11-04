defmodule App.Group do
  alias App.Game
  use Ecto.Schema
  import Ecto.Changeset

  schema "groups" do
    field :title, :string
    field :level, :integer
    field :members, :string

    belongs_to :game, Game

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:title, :level, :members])
    |> validate_required([:title, :level, :members])
  end
end
