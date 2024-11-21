defmodule App.Game do
  alias App.Group
  use Ecto.Schema
  alias App.Repo
  import Ecto.Changeset
  @derive Jason.Encoder

  schema "games" do
    field :extra, :string
    has_many :groups, Group

    timestamps(type: :utc_datetime)
  end

  def add_group(group) do
    IO.puts(group)
  end

  @spec changeset(
          {map(), map()}
          | %{
              :__struct__ => atom() | %{:__changeset__ => any(), optional(any()) => any()},
              optional(atom()) => any()
            },
          :invalid | %{optional(:__struct__) => none(), optional(atom() | binary()) => any()}
        ) :: Ecto.Changeset.t()
  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:extra])
    |> Ecto.Changeset.cast_assoc(:groups)
    |> validate_required([:extra])
  end
end
