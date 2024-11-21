defmodule AppWeb.GameJSON do
  def daily(%{game: game}) do
    processed_groups = process_groups(game.groups)
    %{
      groups: processed_groups,
      startingGroups: createStartingGroups(processed_groups)
    }
  end

  @spec process_groups([%{members: [], name: String.t(), level: integer}]) :: list
  defp process_groups(groups) do
    Enum.map(groups, fn g -> %{level: g.level, title: g.title, members: String.split(g.members, ";")} end)
  end

  defp createStartingGroups(groups) do
    Enum.map(groups, fn group -> end)
  end
end
