defmodule AppWeb.GameController do
  # alias AppWeb.Game.Game
  use AppWeb, :controller
  # import AppWeb.Game
  alias App.Game
  alias App.Repo
  import Ecto.Query

  def daily(conn, _params) do
    game = Repo.one!(from g in Game, preload: [:groups])
    IO.inspect(game.groups)
    res = %{
      groups: game.groups,
      startingGroups: game.groups
    }

    render(conn, game: res)
  end
end
