defmodule AppWeb.GameController do
  use AppWeb, :controller
  alias App.Game
  alias App.Repo
  import Ecto.Query

  def daily(conn, _params) do
    game = Repo.one!(from g in Game, preload: [:groups])

    res = %{
      groups: game.groups,
      startingGroups: game.groups
    }

    render(conn, game: res)
  end
end
